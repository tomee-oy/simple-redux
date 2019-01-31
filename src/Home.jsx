import React from 'react'
import Child from './Child'
import { storage, inject } from '../packages'

@inject()
export default class Home extends React.Component {
    componentWillMount() {
        // 通过请求接口获取数据，然后存入store
        storage('menu', 'http://rest.apizza.net/mock/c1609ca45d5e1e5f81e25a5186d0f4b7/menu', {
            method: 'GET'
        })

        // 存储基础类型
        storage('isDemo', true)

        // 手动发送action
        this.props.dispatch({
            type: 'CONSUMER_TOTAL',
            payload: 123321
        })
    }
    render() {
        return (
            <div>
                <div>这里是父组件内容</div>
                <Child />
            </div>
        )
    }
}