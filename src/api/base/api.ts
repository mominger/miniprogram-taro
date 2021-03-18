import Taro from '@tarojs/taro'
import Http from './http'
import configStore from '../../redux/store'
import { removeToken } from '../../redux/actions/user'

const store = configStore()

type Result = Taro.request.SuccessCallbackResult<any> | undefined

interface Err {
  code: number
  message: string
}

export interface APILayout<T> {
  code: number
  data: T
}
export interface APIMessage<T> {
  code: number
  message: T
}

export class API extends Http {
  // exception done
  protected errMessage(error: Error | any, result: Result): Err | null {
    if (result?.statusCode === 200) {
      return null
    }
    const code = error?.status || result?.statusCode
    // 401 清空token
    if (code === 401) {
      store.dispatch(removeToken())
    }
    const errInfo = {
      401: '用户未登录',
      404: '找不到访问资源',
      500: '服务器繁忙',
    }
    return {
      code,
      message: errInfo[code] ? errInfo[code] : '其他错误',
    }
  }
}

