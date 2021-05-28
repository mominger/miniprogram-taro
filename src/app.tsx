import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
//import { Provider } from 'react-redux'
//import configStore from './redux/store'
import {Provider} from 'mobx-react';
import Store from './store';
//import { initCurrentAddress } from './redux/actions/user'
import Log from '@biz-kit/log';
import './app.scss'


//小程序异常统一捕获
Taro.onError((msg) => {
  Log.error(msg)
})

const App = (props) => {
  //初始化通过ip获取定位地址
  /* useEffect(() => {
    const { currentAddress } = store.getState()
    if (!currentAddress.latitude && !currentAddress.longitude) {
      store.dispatch<any>(initCurrentAddress())
    }
  }, []) */

  return <Provider {...Store}>{props.children}</Provider>
}

export default App
