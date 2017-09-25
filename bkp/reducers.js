import {ADD_USER, ADD_POST_ITEM} from '../miniblog/src/redux/actions/actionName';

export default {
    users: (state = [], {type, payload} = {}) => {
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
    },
    postItems: (state = [], {type, payload} = {}) => {
        switch (type) {
            case ADD_POST_ITEM:
                return Object.assign({}, state, {
                    postItems: [
                        ...state.postItems,
                        {payload}
                    ]
                });
            default:
                return state
        }
    },
}