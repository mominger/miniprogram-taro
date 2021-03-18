import {APILayout,API} from './base/api'
import to from 'await-to-js'
import {BASEURL } from '../config/index'
import {
  Ip,
  ILoginParams,
  ILogin,
  
} from './base/interface'


class UserAPI extends API {
  //获取ip地址
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

export default new UserAPI()