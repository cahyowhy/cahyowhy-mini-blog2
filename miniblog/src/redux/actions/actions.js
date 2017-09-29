import {createPostItem, createUser, getPostItem, getUser, updateUser, updatePostItem} from '../../db/Main';
import {ADD_USER, ADD_POST_ITEM} from './actionName';

export function onAddPostItem(PostItem) {
    createPostItem(PostItem);

    return ({
        type: ADD_POST_ITEM
    })
}

export function onAddUser(User) {
    createUser(User);

    return ({
        type: ADD_USER
    })
}