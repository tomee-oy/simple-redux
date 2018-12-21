import createAction from './createAction'
import { injectReducer } from './store'
import createReducer from './createReducer'
import initialStore, { store } from './store'
import { connect } from 'react-redux'

export const storage = (argsName, args) => {
    // 创建action
    const type = Symbol.for(argsName)
    const action = createAction(type, args)

    // 动态合并reducer
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
    injectReducer(argsName, createReducer(type, initState))

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
    const mapDispatchToProps = (dispatch, props) => {}
    return connect(mapStateToProps, mapDispatchToProps)(comp)
}