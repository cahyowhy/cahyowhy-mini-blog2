import {ADD_POST_ITEM} from '../actions/actionName';

export default (state = [], {type, payload} = {}) => {
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
    }