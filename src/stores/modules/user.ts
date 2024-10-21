import type { LoginParam } from '@/api/user/model'
import fetchApi from '@/api/user/login'
import { defineStore } from 'pinia'
import { getUserInfo, setToken, setUserInfo } from '@/utils/auth'

export const useCounterStore = defineStore('user', () => {
  const login = async (param: LoginParam) => {
    const res: any = await fetchApi.login(param)
    // console.log(12333, res)
    setToken(res.access_token)
    setUserInfo(res.user)
    // console.log(1233333, getUserInfo())
    return res
  }
  const logout = () => {
    // console.log(1)
  }
  return { login, logout }
})
