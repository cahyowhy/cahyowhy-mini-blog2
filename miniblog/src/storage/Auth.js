import {AsyncStorage} from 'react-native';

export default class Auth {
    static setUser(params) {
        return new Promise((resolve, reject) => {
            if (typeof params === "object") params = JSON.stringify(params);

            AsyncStorage.setItem('user', params, (err) => {
                if (err) reject(err)
            })
                .then(() => resolve('Save Success'))
                .catch((err) => reject(err));
        });
    }

    static getUser() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('user', (err) => {
                if (err) reject(err)
            }).then(function (result) {
                resolve(JSON.parse(result));
            }).catch((err) => reject(err));
        });
    }

    static isUserLoggedIn() {
        const context = this;
        return new Promise((resolve) => {
            context.getUser().then(function (result) {
                if (result.isLoggedIn !== undefined) {
                    resolve(result.isLoggedIn);
                } else {
                    resolve(false);
                }
            }).catch((err) => resolve(false));
        })
    }

    static removeItem() {
        return new Promise((resolve, reject) => {
            AsyncStorage.removeItem('user').then(() => resolve('Delete Success'))
                .catch((err) => reject(err));
        });
    }
}