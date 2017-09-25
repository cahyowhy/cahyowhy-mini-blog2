import {ADD_USER} from '../actions/actionName';

export default (state = [], {type, payload} = {}) => {
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