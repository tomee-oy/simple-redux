import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import createReducer from './createReducer'

const sagaMiddleware = createSagaMiddleware()
let middlewares = [
    sagaMiddleware
]

export let store = {}

const createInitReducer = (initialState) => {
    for (let key in initialState) {
        const type = Symbol.for(key.toString())
        const reducer = createReducer(type, initialState[key])
        store.injectReducer(key, reducer)
    }
}


const injectReducer = (name, asyncReducer) => {
    if (store.asyncReducers.hasOwnProperty(name)) return
    store.asyncReducers[name] = asyncReducer
    store.replaceReducer(rootReducer(store.asyncReducers))
}

const batchInjectReducer = reducers => {
    for(let reducerName in reducers) {
        store.injectReducer(reducerName, reducers[reducerName])
    }
}

export default function initialStore(initialState = {}, injectedMiddlewares = []) {
    if(typeof initialState !== 'object' && injectedMiddlewares.length === 0) {
        throw new Error('store初始化状态必须为对象')
    }
    if(typeof initialState === 'array' && injectedMiddlewares.length === 0) {
        middlewares = [
            ...middlewares,
            ...initialState
        ]
    }
    if(typeof initialState === 'object') {
        middlewares = [
            ...middlewares,
            ...injectedMiddlewares
        ]
    }
    store = createStore(rootReducer(), applyMiddleware(...middlewares))
    store.runSaga = (saga, ...args) => sagaMiddleware.run(saga, ...args)
    store.asyncReducers = {}
    store.injectReducer = injectReducer
    store.batchInjectReducer = batchInjectReducer
    createInitReducer(initialState)
    return store
}


