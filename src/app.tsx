import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import configStore from './redux/store'
import { initCurrentAddress } from './redux/actions/user'

import './app.scss'

const store = configStore()

const App = (props) => {
  //初始化通过ip获取定位地址
  useEffect(() => {
    const { currentAddress } = store.getState()
    if (!currentAddress.latitude && !currentAddress.longitude) {
      store.dispatch<any>(initCurrentAddress())
    }
  }, [])

  return <Provider store={store}>{props.children}</Provider>
}

export default App
