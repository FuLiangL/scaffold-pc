import fetch from '@/common/fetch'

const getMenuInfo = (data?: object | undefined) => fetch('/api/getMenuInfo', data, 'POST')
// 获取路由借口哦
export default getMenuInfo
