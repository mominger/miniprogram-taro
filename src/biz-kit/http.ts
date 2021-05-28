import { request} from '@tarojs/taro'
import {BASEURL } from '@biz-kit/config/index'


interface IResult<T> {
  data: T | any;  //数据
  error: string; //错误信息
  code: string; //状态码
}

async function excute<T>({
  url,
  data,
  method = 'GET',
  ...otherConfig
}: Taro.RequestParams) {
  const token = '';
  return new Promise<IResult<T>>((resolve, reject) => {
      request({
        url: BASEURL + url,
        data,
        method,
        header: {
          accept: 'application/json; charset=utf-8',
          'content-Type': 'application/json',
          token: token || '',
          ...otherConfig,
        },
        // 成功回调
        success(result: Taro.request.SuccessCallbackResult): void {
          const res = result.data;

          //如果不是200
          const statusCode = result.statusCode;
          if (statusCode !== 200){
            switch (statusCode) {
              case 401:
                console.error("清空token,用户需登录");
                break;
              case 404:
                console.error("找不到访问资源");
                break;
              case 500:
                console.error("服务器繁忙");
                break;
              default:
                console.error("服务器异常");
            }
            reject(res);
            return;
          }

          //通用的异常处理
          switch (res.code) {
            case 0:
              resolve(res.data);
              break;
            case 1:
              console.error("登录过期，导航到登录界面");
              break;
            default:
              //const error = I18.t(`errorCodes.${res.result}`) || res.error;
              //Toast.show(error);
              reject(res);
          }
        },
        // 失败回调
        fail(err: Taro.General.CallbackResult): void {
          console.error(err);
          reject(err)
        },
      })
    })
}

function createMethod<T>(type: 'GET' | 'POST' | 'PUT' | 'DELETE'): any {
  return async (url: string, data?: object, otherConfig?: object) => {
    return await excute<T>({
      url,
      method: type,
      data,
      otherConfig,
    });
  };
}

const http = {
  get: createMethod('GET'),
  post: createMethod('POST'),
};

export default http;
