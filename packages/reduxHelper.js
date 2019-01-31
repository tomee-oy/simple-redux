import createAction from './createAction'
import createReducer from './createReducer'
import { injectReducer, store } from './store'
import request from './request'
import { connect } from 'react-redux'
import { take, put, call } from 'redux-saga/effects'

let successType = ''
let action = {}
let type = ''

function* httpSaga(url, option = {method: 'GET'}) {
    try {
        yield take(type)
        const response = yield call(request, url, option)
        yield put({
            type: successType,
            payload: response
        })
    } catch (error) {
        throw new Error('saga中请求报错')
    }
}

export const storage = (argsName, args, option) => {

    // 创建action
    type = Symbol.for(argsName)
    action = createAction(type, args)

    // reducer初始值
    let initState = {}
    const argType = typeof args
    switch (argType) {
        case 'number':
            initState = 0
            break
        case 'string':
            initState = ''
            break
        case 'boolean':
            initState = true
            break
        default:
            if (Array.isArray(args)) {
                initState = []
            } else {
                initState = {}
            }
            break
    }
    // 如果第二个参数是字符串并且其中包含“/”，则说明是url需要发请求
    if (argType === 'string' && args.indexOf('/') !== 0) {
        initState = {}
        successType = Symbol.for(argsName + new Date().getMilliseconds())
        // 动态注入reducer
        store.injectReducer(argsName, createReducer(successType, initState))
        // 注册saga
        store.runSaga(httpSaga, args, option)
    } else {
        store.injectReducer(argsName, createReducer(type, initState))
    }

    // 触发action
    store.dispatch(action)
}

export const inject = (...args) => comp => {
    const mapStateToProps = store => {
        const props = {}
        args.forEach(element => {
            props[element] = store[element]
        })
        return props
    }
    return connect(mapStateToProps)(comp)
}