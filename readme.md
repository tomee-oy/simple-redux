## redux-simple-helper

### ✨一行代码解决从dispatch到saga再到reducer，解放你的双手！

#### 特点
* 🚅 速存速取
* 🌲 支持同步、异步存入数据
* 🚀 快捷获取数据
* 🎉 兼容传统的redux流程

#### 一、安装
```javascript
  npm install redux-simple-helper --save-dev
```

示例运行：
```javascript
  npm install
  npm run demo
```

在浏览器打开：`http://localhost:5000`进行访问

#### 二、使用方式
##### 2.1 初始化

```javascript
  import { initialStore, Provider } from 'redux-simple-helper'
  const store = initialStore()
```
如果想要在`store`创建的时候初始化进入一些值，可以像这样操作：

```javascript
  const store = initialStore({
      injectMsg: 'initialState'
  })
```

如果你想要手动添加一些`redux`插件，可以这样做：

```javascript
  const store = initialStore([createLogger()])
```

既要初始化，又要添加`redux`插件，则：

```javascript
  import { createLogger } from 'redux-logger'
  const store = initialStore({
      injectMsg: 'initialState'
  }, [createLogger()])
```

`Provider`和`redux`中`Provider`的用法一样，位于整个应用的顶部即可。

##### 2.2 存储数据

```javascript
  import { storage } from 'redux-simple-helper'
  storage('isDemo', true)
```

##### 2.3 取数据

```javascript
  import { inject } from 'redux-simple-helper'

  @inject('isDemo')
  export default class Child extends React.Component {
      render() {
          const {isDemo} = this.props
          return (
              <div style={{marginLeft: '10px'}}>
                  <div>直接存入布尔值的测试：{isDemo.toString()}</div>
              </div>
          )
      }
  }
```

##### 2.4 请求接口并将数据存入store

```javascript
  storage('menu', 'http://rest.apizza.net/mock/c1609ca45d5e1e5f81e25a5186d0f4b7/menu', {
      method: 'GET'
  })
```

第一个参数是存储store后数据的名称，第二个参数是请求地址，第三个参数是请求参数。取数据的方法和之前的一致。

##### 2.5 支持原始的redux操作

写好自定义的 `reducer`：

```javascript
  export const total = (state = 0, action) => {
    if(action.type === 'CONSUMER_TOTAL') {
      return action.payload
    }
    return state
  }
```

初始化创建`store`后，将reducer注册进去：

```javascript
  // 自定义reducer注入
  store.batchInjectReducer(reducers)
```

在组件中发送`action`：
```javascript
  import { inject } from 'redux-simple-helper'

  @inject()
  export default class Home extends React.Component {
      componentWillMount() {
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
```

在`Child`组件中取值：

```javascript
  import { inject } from 'redux-simple-helper'

  @inject('total')
  export default class Child extends React.Component {
      render() {
          const {total} = this.props
          return (
              <div style={{marginLeft: '10px'}}>
                  <div>这个是手动编写reducer，手动dispatch产生的值：{total}</div>
              </div>
          )
      }
  }
```