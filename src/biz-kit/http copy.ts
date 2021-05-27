//import config from './config';
//import User from './user';
//import I18 from './i18';

interface IResult<T> {
  data: T | any;
  error: string;
  result: string;
}

async function excute<T>({
  url,
  data,
  method = 'GET',
  ...restParams
}: Taro.RequestParams): Promise<IResult<T>> {
  debugger
  //let user = await User.getUser();
  //const token = user?.token;
  const token = '';
  const body = JSON.stringify(data);
  const abort = new AbortController();
  const request = {
    method,
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
      credentials: 'omit',
      token: token || '',
      ...otherConfig,
    },
    body: method == 'GET' ? null : body,
    signal: abort.signal,
  };

  const timeId = setTimeout(() => {
    abort.abort();
  }, 30 * 1000);

  return new Promise<IResult<T>>((resolve, reject) => {
    fetch(url, request)
      .then(async (res) => {
        clearTimeout(timeId);
        return res.text();
      })
      .then((r) => {
          console.log(`${url}`, request);
          console.log('数据响应: ', r);

        r = JSON.parse(r);
        const res: any = r;

        switch (res.result) {
          case '000000':
            resolve(res.data);
            break;
          case '000002':
            //Toast.show(I18.t('http.loginTimeout'));
            User.clean();

            //todo: 导航到登录界面
            //Nav.reset('Login');
            break;
          default:
            //const error = I18.t(`errorCodes.${res.result}`) || res.error;
            //Toast.show(error);
            reject(res);
        }
      })
      .catch((err) => {
        clearTimeout(timeId);
        console.error(`${url}`, request);
        console.error(err);
        reject({res: {}, err});
        //Toast.show(I18.t('http.serverError'));
      });
  });
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
