const TokenKey: string = 'token'

function getToken(): string | null {
  return window.localStorage.getItem(TokenKey) || null
}

function setToken(key: string): void {
  if (!key) {
    throw Error('token not')
  }
  window.localStorage.setItem(TokenKey, key)
}

function removeToken(): void {
  window.localStorage.removeItem(TokenKey)
}

export {
  getToken,
  setToken,
  removeToken,
}
