export interface LoginParam {
  username: string
  password: string
}

export interface ResResult {
  login_status: number
  st: string
  token: string
}
export interface UserState {
  token: string
  auths: strig[]
}
