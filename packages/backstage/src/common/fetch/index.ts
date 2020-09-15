import 'whatwg-fetch'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import { baseUrl } from './env'

// import router from '../../router'

type RequestUrl = string | {
  url: string
  params?: any
}

export default async (url: RequestUrl, data: Object | null = {}, method = 'GET', config?: RequestInit) => {
  let requestUrl = baseUrl + url
  if (typeof url === 'object') {
    requestUrl += qs.stringify(url.params || {}, {
      addQueryPrefix: true,
    })
  }

  const requestConfig: RequestInit = {
    method,
    credentials: 'include' as RequestCredentials,
    mode: 'cors' as RequestMode,
    cache: 'force-cache' as RequestCache,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // header 是合并模式, 避免被 config 直接覆盖
      ...config?.headers,
    },
  }

  if (data) {
    requestConfig.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(requestUrl, requestConfig)
    if (response.status === 200) {
      const json = await response.json()
      switch (json.code) {
        case 401:
        case 510:
        case 511:
        case 512:
          MessageBox.confirm(
            json.message,
            '提示',
            { closeOnClickModal: false },
          ).then((e) => {
            console.log(e)
            // router.push({ path: '/login' })
          })
          break
        case 400:
        case 403:
        case 500:
        case 600:
          Message.warning(json.message)
          break
        default:
          return json
      }
      // eslint-disable-next-line
      return Promise.reject({
        code: json.code,
        message: json.message,
      })
    }
    Message.error(response.statusText)
    return Promise.reject()
  } catch (error) {
    throw new Error(error)
  }
}
