const Realm = require('realm');
const lodash = require('lodash');
const AuthSchema = {
    name: 'Auth',
    primaryKey: 'id',
    properties: {
        id: 'int',
        userId: 'string',
        authentication: 'string',
        imageurl: 'string',
        username: 'string',
        name: 'string',
        isLoggedIn: 'bool'
    }
};
const realm = new Realm({schema: [AuthSchema]});

export default class Auth {
    init() {
        try {
            if (!this.isLoggedIn()) {
                realm.write(() => {
                    realm.create('Auth', {
                        userId: '',
                        authentication: '',
                        imageurl: '',
                        username: '',
                        name: '',
                        isLoggedIn: false
                    });
                });
            }
        } catch (err) {
            console.log(err.toString());
        }
    }

    set(userId, authentication, imageurl, username, name) {
        try {
            realm.write(() => {
                let data = lodash.pickBy({
                    id: 0,
                    userId,
                    authentication,
                    imageurl,
                    username,
                    name,
                    isLoggedIn: true
                }, lodash.identity);
                realm.create('Auth', data, true);
            });
        } catch (err) {
            console.log(err.toString());
        }
    }

    get() {
        let data;
        try {
            data = realm.objects('Auth').filtered('id=0')[0];
        } catch (err) {
            data = {};
        }

        return data;
    }

    isLoggedIn() {
        let isLoggedIn;
        try {
            isLoggedIn = !lodash.isEmpty(this.get());
        } catch (err) {
            isLoggedIn = false;
        }

        return isLoggedIn;
    }

    clear() {
        try {
            realm.delete(this.getData());
        } catch (err) {
            console.log(err);
        }
    }
}