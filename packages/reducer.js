import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default (asyncReducers) => {
    return combineReducers({
        ...asyncReducers,
        routing: routerReducer
    })
}