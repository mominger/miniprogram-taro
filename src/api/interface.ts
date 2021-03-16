// Ip地址
export interface Ip {
  city: string
  latitude: number
  longitude: number
  recommend: string
}

// 注册
export interface IRegisterParams {
  phone: string
  password: string
  password2: string
}

export interface IRegister {
  code: number
  message: string
}

// 登录
export interface ILoginParams {
  phone: string
  password: string
}
export interface ILogin {
  code: number
  message: string
  token: string
}


