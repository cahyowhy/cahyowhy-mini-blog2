import Realm from 'realm'

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
            savedDate: {type: 'date'},
            user: {type: 'User'}
        }
    }
}

const filterPostAttr = (item) => {
    return {
        id: item.id,
        title: item.title,
        created_at: item.created_at,
        category: item.category,
        review: item.review,
        mark: item.mark,
        image: item.image,
        user: item.user,
        savedDate: new Date()
    }
};

const filterUserAttr = (item) => {
    return {
        id: item.id,
        username: item.username,
        email: item.email,
        imageurl: item.imageurl,
        created_at: item.created_at,
        total_follower: item.total_follower,
        total_following: item.total_following,
        savedDate: new Date()
    }
};

export function getPostItems() {
    return PostItem.get()
}

export function getPostItemByCategory(category) {
    return getPostItems.filtered(`category = "${category}"`)
}

export function getPostItemByUserId(user) {
    return getPostItems.filtered(`user.id = "${user}"`)
}

export function getUsers() {
    return User.get()
}

export function getUser(id) {
    return realm.objectForPrimaryKey(User, id)
}

export function updateUser(value) {
    realm.write(() => {
        realm.create(User.schema.name, filterUserAttr(value), true)
    })
}

export function updatePostItem(value) {
    realm.write(() => {
        realm.create(PostItem.schema.name, filterPostAttr(value), true)
    })
}

export function getPostItem(id) {
    return realm.objectForPrimaryKey(PostItem, id)
}

export function createPostItem(value) {
    realm.write(() => {
        realm.create(PostItem.schema.name, filterPostAttr(value), true)
    })
}

export function createUser(value) {
    realm.write(() => {
        realm.create(User.schema.name, filterUserAttr(value), true)
    })
}

export function deletePostItem(postItem) {
    realm.write(() => {
        realm.delete(postItem)
    })
}

export function deleteUser(user) {
    realm.write(() => {
        realm.delete(user)
    })
}

const realm = new Realm({schema: [PostItem, User]}) //keep this shit in the last line fuck!
