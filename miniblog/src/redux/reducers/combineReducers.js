import {combineReducers} from 'redux'
import users from './users';
import postItems from './postItems';

export default combineReducers({
    users, postItems
})