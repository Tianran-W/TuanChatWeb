import { Api } from './terre/apis'
import { Api as apis } from './tuanchat/Api'

export const computedToken = {
  get() {
    return localStorage.getItem('token') || ''
  }
}

export const terreApis = new Api({ baseURL: import.meta.env.VITE_TERRE_URL }).api
export const tuanApis = new apis({
  baseURL: import.meta.env.VITE_API_PREFIX,
  headers: { Authorization: `Bearer ${computedToken.get()}` }
}).capi
