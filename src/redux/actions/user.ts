import Taro from '@tarojs/taro'
import UserAPI from '../../api/user'
import {
  SETTOKEN,
  CURRENTADDRESS,
  REMOVETOKEN,
  SETEMAIL,
} from '../actionTypes'

// 设置token
export const setToken = (token: string) => {
  Taro.setStorageSync('token', token)
  return { type: SETTOKEN, payload: token }
}

// 设置email
export const setEmail = (email: string) => {
  return { type: SETEMAIL, payload: email }
}

// 删除token
export const removeToken = () => {
  Taro.removeStorageSync('token')
  return { type: REMOVETOKEN }
}

// 设置地址信息:以此定位到当前的航班站点
export const setCurrentAddress = (address) => ({
  type: CURRENTADDRESS,
  payload: address,
})

// 通过ip 初始化定位
export const initCurrentAddress = () => {
  return async (dispatch) => {
    const { err, res } = await UserAPI.reqIpAddress()

    if (err) {
      console.log(err)
      return
    }

    if (res.code === 0) {
      const { city, latitude, longitude } = res.data
      // 保存地址到redux
      dispatch(
        setCurrentAddress({
          city,
          latitude,
          longitude,
        })
      )
    } else {
    }
  }


}
