const TokenKey = 'x-auth-token'
const UserInfo = 'userInfo'
export function getToken() {
  return localStorage.getItem(TokenKey) || ''
}

export function setToken(token: string) {
  localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  localStorage.setItem(TokenKey, '')
}
export function getUserInfo() {
  const userInfo = localStorage.getItem(UserInfo) || ''
  return JSON.parse(userInfo)
}

export function setUserInfo(userInfo: string) {
  localStorage.setItem(UserInfo, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  localStorage.setItem(UserInfo, '')
}
