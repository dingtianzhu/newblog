import type { LoginParam, ResResult } from './model'
import { post } from '../../utils/http'
import type { AxiosResponse } from 'axios'
import { GET, POST } from '@/utils/request'

enum URL {
  login = '/login',
  logout = 'logout'
}
const login = async (data: LoginParam) => post<ResResult>({ url: URL.login, data })

export default { login }
/*
export const logins = (params?: Object): Promise<AxiosResponse<any, any>> => {
  return POST({
    url: URL.login,
    params
  })
}*/
