/**
 * 手机号校验
 * @param phoneNumber - 手机号
 * @returns true=是手机号，false=不是手机号
 */
export function isMob(phoneNumber: number | string): boolean {
  return /^1[3456789]\d{9}$/.test(String(phoneNumber))
}

/**
 * 邮箱校验
 * @param email - 邮箱地址
 * @returns true=是邮箱地址，false=不是邮箱地址
 */
export function isEmail(email: string): boolean {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(email)
}
