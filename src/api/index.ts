import Taro from '@tarojs/taro'
import to from 'await-to-js'
import Server from './serve'
import configStore from '../redux/store'
import { removeToken } from '../redux/actions/user'
import {
  Ip,
  ILoginParams,
  ILogin,
  
} from './interface'

let BASEURL: string = 'http://127.0.0.1:4000/api'

const store = configStore()

type Result = Taro.request.SuccessCallbackResult<any> | undefined

interface Err {
  code: number
  message: string
}

interface APILayout<T> {
  code: number
  data: T
}
interface APIMessage<T> {
  code: number
  message: T
}

class API extends Server {
  // 异常处理
  protected errMessage(error: Error | any, result: Result): Err | null {
    if (result?.statusCode === 200) {
      return null
    }
    const code = error?.status || result?.statusCode
    // 401 清空token
    if (code === 401) {
      // 清空token
      store.dispatch(removeToken())
    }
    const errInfo = {
      401: '请先登录',
      404: '服务器未响应',
      500: '服务器繁忙',
    }
    return {
      code,
      message: errInfo[code] ? errInfo[code] : '其他错误',
    }
  }

  // 获取ip地址
  async reqIpAddress() {
    let [error, result] = await to(
      this.ajax({
        url: BASEURL + '/ip',
        data: { key: 'UNZBZ-MJUKS-W76OY-6SGXP-7TIFE-AXBA3' },
      })
    )
    const err = this.errMessage(error, result)
    const res: APILayout<Ip> = result?.data

    return { err, res }
  }

  // 用户登录
  async reqLogin(params: ILoginParams) {
    let [error, result] = await to(
      this.ajax({ url: BASEURL + '/login', data: params, method: 'POST' })
    )

    const err = this.errMessage(error, result)
    const res: ILogin = result?.data

    return { err, res }
  }
}

export default new API()
