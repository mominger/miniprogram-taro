import { request} from '@tarojs/taro'
import Config from '@biz-kit/config/index'
import Toast from './toast';
import { User } from '@biz-kit';


interface IResult<T> {
  data: T | any;  //数据
  error: string; //错误信息
  code: string; //状态码
}

function excute<T>({
  url,
  data,
  method = 'GET',
  ...otherConfig
}: Taro.RequestParams) : Promise<IResult<T>> {
  const token = User.getUser()?.token;
  return new Promise<IResult<T>>((resolve, reject) => {
      request({
        url,
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

          //状态码处理
          const statusCode = result.statusCode;
          if (statusCode !== 200){
            switch (statusCode) {
              case 401:
                Toast.show("清空token,用户需登录");
                break;
              case 404:
                Toast.show("找不到访问资源");
                break;
              case 500:
                Toast.show('服务器繁忙');
                break;
              default:
                Toast.show("服务器异常");
            }
            reject(res);
            return;
          }

          //异常码处理
          switch (res.code) {
            case 0:
              resolve(res.data);
              break;
            case 1:
              Toast.show('登录过期,需重新登录');
              reject(res);
              break;
            default:
              //const error = I18.t(`errorCodes.${res.result}`) || res.error;
              Toast.show('登录过期,需重新登录');
              reject(res);
          }
        },
        // 失败回调
        fail(err: Taro.General.CallbackResult): void {
          Toast.show('网络异常');
          reject(err)
        },
      })
    })
}

function createMethod<T>(type: 'GET' | 'POST' | 'PUT' | 'DELETE'): any {
  return async (url: string, data?: object, otherConfig?: object) => {
    url = Config.BASEURL + url;
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
