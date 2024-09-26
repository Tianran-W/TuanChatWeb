import { Api } from './terre/apis'
import apis from './tuanchat/apis'

export const terreApis = new Api({ baseURL: '/' }).api
export const tuanApis = apis
