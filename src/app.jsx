import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Home from './Home'
import { initialStore, Provider } from '../packages'
import { createLogger } from 'redux-logger'
import * as reducers from './reducer'

// 初始化状态
const store = initialStore({
    injectMsg: 'initialState'
}, [createLogger()])

// 自定义reducer注入
store.batchInjectReducer(reducers)

class App extends React.Component {
    
    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))