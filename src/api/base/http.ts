import { request, getStorageSync } from '@tarojs/taro'

class Http {
  public ajax({
    url,
    data,
    method = 'GET',
    ...restParams
  }: Taro.RequestParams) {
    // 鉴权token
    const Authorization: string = getStorageSync('token') || ''
    let contentType: string
    
    // GET
    if (method === 'GET') {
      contentType = 'application/json'
      // POST
    } else if (method === 'POST') {
      contentType = 'application/x-www-form-urlencoded'
    }
    return new Promise<Taro.request.SuccessCallbackResult>(
      (resolve, reject) => {
        request({
          url,
          data,
          method,
          header: {
            'content-type': contentType,
            Authorization,
          },
          ...restParams,
          // 成功回调
          success(res: Taro.request.SuccessCallbackResult): void {
            resolve(res)
          },
          // 失败回调
          fail(err: Taro.General.CallbackResult): void {
            reject(err)
          },
        })
      }
    )
  }
}

export default Http
