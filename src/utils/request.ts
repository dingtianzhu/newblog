import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from './auth'
interface requestType {
  url: string
  params?: any
}
const handleCode = async (code: number, msg: string) => {
  switch (code) {
    case 401:
      //这里缺一个报错提示插件
      setTimeout(() => {
        console.log('登陆失败')
      }, 1500)
      break
    default:
      console.log(msg)
      break
  }
}
//创建axios赋给常量service
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
//添加请求连接器
service.interceptors.request.use(
  (config: any) => {
    const token = getToken()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token
      }
      // config.headers['Authorization'] = token;
    }
    console.log(config)
    return config
  },
  (error: any) => {
    //请求错误时处理
    console.log(error)
    return Promise.reject(error)
  }
)
//添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    //处理响应数据
    const { data, config } = response
    return data
  },
  (error: any) => {
    const { response } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data.msg)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      message.error(message || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

/**
 * @description GET
 */
const GET = ({ url, params }: requestType) => {
  return service({
    url,
    method: 'GET',
    params
  } as AxiosRequestConfig)
}

/**
 * @description POST
 */
const POST = ({ url, params }: requestType) => {
  return service({
    url,
    method: 'POST',
    data: params
  } as AxiosRequestConfig)
}
/**
 * @description PUT
 */
const PUT = ({ url, params }: requestType) => {
  return service({
    url,
    method: 'PUT',
    data: params
  } as AxiosRequestConfig)
}

/**
 * @description DELETE
 */
const DELETE = ({ url, params }: requestType) => {
  return service({
    url,
    method: 'delete',
    data: params
  } as AxiosRequestConfig)
}

/**
 * @description PATCH
 */
const PATCH = ({ url, params }: requestType) => {
  return new Promise((resolve, reject) => {
    service
      .put(url, params)
      .then((res: any) => {
        if (res && res.status == 200) {
          resolve(res)
        }
      })
      .catch((error: any) => {
        reject(error)
      })
  })
}
export { GET, POST, PUT, DELETE, PATCH }
