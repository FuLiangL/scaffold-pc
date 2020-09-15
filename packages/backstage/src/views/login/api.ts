import fetch from '@/common/fetch'
// 登录
export const login = (data: object | undefined) => fetch('/api/login', data, 'POST')
// 退出
export const loginOut = (data: object | undefined) => fetch('/api/login', data, 'POST')
