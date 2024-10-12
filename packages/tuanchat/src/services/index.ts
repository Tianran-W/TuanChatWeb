import { errHandler, repDataHandler } from './errHandler'
import { Api as TerreApi } from './terre/apis'
import { Api as TuanApi } from './tuanchat/apis'
import type { Message, RoomGroup, UserRole, RoleAvatar, RoleAbilityTable } from './tuanchat/apis'

const tuanApiIns = new TuanApi({
  baseURL: import.meta.env.VITE_API_PREFIX
})
export const axiosIns = tuanApiIns.instance
axiosIns.interceptors.response.use(repDataHandler, errHandler)

export const terreApis = new TerreApi({ baseURL: import.meta.env.VITE_TERRE_URL }).api
export const tuanApis = tuanApiIns.capi

export type { Message, RoomGroup, UserRole, RoleAvatar, RoleAbilityTable }
