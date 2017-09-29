import {ADD_USER} from '../actions/actionName';
import {getUsers} from '../../db/Main';

export default (state = getUsers(), {type, payload} = {}) => {
    switch (type) {
        case ADD_USER:
            return Object.assign({}, state, {
                users: [
                    ...state.users,
                    {payload}
                ]
            });
        default:
            return state
    }
}