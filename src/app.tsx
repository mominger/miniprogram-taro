import Taro from '@tarojs/taro'
import React from 'react'
import {Provider} from 'mobx-react';
import Store from './store';
import Log from '@biz-kit/log';
import './app.scss'


//小程序异常统一捕获
Taro.onError((msg) => {
  Log.error(msg)
})

const App = (props) => {
  return <Provider {...Store}>{props.children}</Provider>
}

export default App
