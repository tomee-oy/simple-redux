import React from 'react'
import { inject } from '../packages'

@inject('menu', 'injectMsg', 'isDemo', 'total')
export default class Child extends React.Component {
    render() {
        const {menu, injectMsg, isDemo, total} = this.props
        if(!menu || JSON.stringify(menu) === '{}' ) return null
        return (
            <div style={{marginLeft: '10px'}}>
                <div>通过请求接口获取的数组：</div>
                {
                    menu.map((item, index) => <div key={index}>{item.name}</div>)
                }
                <div>初始化时注入的内容：{injectMsg}</div>
                <div>直接存入布尔值的测试：{isDemo.toString()}</div>
                <div>这个是手动编写reducer，手动dispatch产生的值：{total}</div>
            </div>
        )
    }
}