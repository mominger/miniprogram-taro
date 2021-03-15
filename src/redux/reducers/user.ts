import Taro from '@tarojs/taro'
import {
  SETTOKEN,
  REMOVETOKEN,
  CURRENTADDRESS,
} from '../action-types'
import { Reducers } from '../interface'

interface Action<T, D = string> {
  type: T
  payload: D
}

// 用户token
type TOKENTYPE = typeof SETTOKEN | typeof REMOVETOKEN
const initToken: string = Taro.getStorageSync('token') || ''
const token = (
  state = initToken,
  action: Action<TOKENTYPE, Reducers['token']>
) => {
  const { type, payload } = action
  switch (type) {
    case SETTOKEN:
      return payload
    case REMOVETOKEN:
      return ''
    default:
      return state
  }
}

// 当前地址
type CURRENTADDRESSTYPE = typeof CURRENTADDRESS
const initCurrentAddress = {
  id: '',
  city: '', // 城市名称
  address: '', //详细地址
  latitude: '', // 纬度
  longitude: '', // 经度
}
const currentAddress = (
  state = initCurrentAddress,
  action: Action<CURRENTADDRESSTYPE, Reducers['currentAddress']>
) => {
  const { type, payload } = action
  switch (type) {
    case CURRENTADDRESS:
      return { ...state, ...payload }
    default:
      return state
  }
}


export default {
  token,
  currentAddress,
}
