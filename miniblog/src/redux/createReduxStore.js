import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/combineReducers'

export default function createReduxStore(initialState) {
    const enhancer = compose(
        applyMiddleware(thunk)
    )
    return createStore(reducers, initialState, enhancer)
}