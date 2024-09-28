import { Api as TerreApi } from './terre/apis'
import { Api as TuanApi } from './tuanchat/apis'

export const computedToken = {
  get() {
    return localStorage.getItem('token') || ''
  }
}

export const terreApis = new TerreApi({ baseURL: import.meta.env.VITE_TERRE_URL }).api
export const tuanApis = new TuanApi({
  baseURL: import.meta.env.VITE_API_PREFIX,
  headers: { Authorization: `Bearer ${computedToken.get()}` }
}).capi
