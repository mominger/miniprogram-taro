//import config from './config';
//import User from './user';
//import I18 from './i18';
import { request} from '@tarojs/taro'
import {BASEURL } from '../config/index'


interface IResult<T> {
  data: T | any;
  error: string;
  result: string;
}

async function excute<T>({
  url,
  data,
  method = 'GET',
  ...otherConfig
}: Taro.RequestParams) {
  const token = '';
  return new Promise<Taro.request.SuccessCallbackResult>((resolve, reject) => {
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
          debugger
          const res = result.data;
          resolve(res)
        },
        // 失败回调
        fail(err: Taro.General.CallbackResult): void {
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
