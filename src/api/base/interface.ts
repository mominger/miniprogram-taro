// Ip地址
export interface Ip {
  city: string
  latitude: number
  longitude: number
}

// 登录: 邮箱密码
export interface ILoginParams {
  email: string
  password: string
}

//请求登录响应的用户结构
export interface ILogin {
  code: number
  message: string
  token: string
}


