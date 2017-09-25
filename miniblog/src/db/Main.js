import Realm from 'realm'
// import {ListView} from 'realm/react-native'

class User {
    static get() {
        return realm.objects(User.schema.name)
    }

    static schema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: {type: 'int'},
            username: {type: 'string'},
            email: {type: 'string'},
            imageurl: {type: 'string', default: ''},
            created_at: {type: 'string'},
            total_follower: {type: 'int'},
            total_following: {type: 'int'},
            savedDate: {type: 'date'}
        }
    }
}
class PostItem {
    static get() {
        return realm.objects(PostItem.schema.name)
    }

    static schema = {
        name: 'PostItem',
        primaryKey: 'id',
        properties: {
            id: {type: 'int'},
            title: {type: 'string'},
            created_at: {type: 'string'},
            category: {type: 'string'},
            review: {type: 'string'},
            mark: {type: 'string'},
            image: {type: 'string'},
            user: {type: 'User'},
            savedDate: {type: 'date'}
        }
    }
}

export function getPostItems() {
    return PostItem.get().sorted('savedDate', true)
}

export function getUser() {
    return User.get().sorted('savedDate', true)
}

export function createPostItem(value) {
    realm.write(() => {
        realm.create(PostItem.schema.name, {
            id: value.id,
            title: value.title,
            created_at: value.created_at,
            category: value.category,
            review: value.review,
            mark: value.mark,
            image: value.image,
            user: value.user,
            savedDate: new Date()
        })
    })
}

export function createUser(value) {
    realm.write(() => {
        realm.create(PostItem.schema.name, {
            id: value.id,
            username: value.username,
            email: value.email,
            imageurl: value.imageurl,
            created_at: value.created_at,
            total_follower: value.total_follower,
            total_following: value.total_following,
            savedDate: new Date()
        })
    })
}

export function deletePostItem(postItem) {
    realm.write(() => {
        realm.delete(postItem)
    })
}

export function deleteUser(postItem) {
    realm.write(() => {
        realm.delete(user)
    })
}

const realm = new Realm({schema: [PostItem, User]}) //keep this shit in the last line fuck!
// export const todoItemDS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
