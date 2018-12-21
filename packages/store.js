import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducer'
import createReducer from './createReducer'

const middlewares = [
    thunkMiddleware,
    createLogger()
]

let store = {}

const createInitReducer = (initialState) => {
    for (let key in initialState) {
        const type = Symbol.for(key.toString())
        const reducer = createReducer(type, initialState[key])
        injectReducer(key, reducer)
    }
}

export default function initialStore(initialState = {}) {
    store = createStore(rootReducer(), applyMiddleware(...middlewares))
    store.asyncReducers = {}
    createInitReducer(initialState)
    return store
}


export function injectReducer(name, asyncReducer) {
    if (store.asyncReducers.hasOwnProperty(name)) return
    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(rootReducer(store.asyncReducers))
}

export { store }