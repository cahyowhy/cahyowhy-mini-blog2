import {ADD_POST_ITEM, FILTER_BY_CATEGORY, FILTER_BY_USER, LOAD_MORE} from '../actions/actionName';
import {getPostItems} from '../../db/Main';

const initialState = {
    postItems: getPostItems(),
    category: '',
    user_id: 0,
    offset: 0
};

export default (state = initialState, {type, payload} = {}) => {
    switch (type) {
        case ADD_POST_ITEM:
            return Object.assign({}, state.postItems, {
                postItems: [
                    ...state.postItems,
                    {payload}
                ]
            });
            break;
        case FILTER_BY_USER:
            return Object.assign({}, state.user_id, {
                user_id: payload
            });
            break;
        case FILTER_BY_CATEGORY:
            return Object.assign({}, state.category, {
                category: payload
            });
            break;
        case LOAD_MORE:
            return Object.assign({}, state.offset, {
                offset: payload
            });
            break;
        default:
            return state.postItems
    }
}