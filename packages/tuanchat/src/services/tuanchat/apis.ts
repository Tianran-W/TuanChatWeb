import type {
  LoginResp,
  MessageListResp,
  UserInfoResp,
  GroupListResp
} from '@/services/tuanchat/types'
import type { LoginParam, MessageListParam, UserInfoParam } from '@/services/tuanchat/types'
import { userAlovaIns } from './requests'
import urls from './urls'

const getRequest = <T>(url: string, config?: any) =>
  userAlovaIns.Get<T>(url, { ...config, localCache: 0 })
const postRequest = <T>(url: string, params?: any) => userAlovaIns.Post<T, unknown>(url, params)

export default {
  /** 用户模块 */
  login: (params: LoginParam) => postRequest<LoginResp>(urls.postLogin, params),
  getUserInfo: (params: UserInfoParam) =>
    getRequest<UserInfoResp>(urls.getUserInfo + '?userId=' + params.userId),

  /** 聊天模块 */
  getMessageList: (params: MessageListParam) =>
    getRequest<MessageListResp>(
      `${urls.getMessageList}?pageSize=${params.pageSize}&roomId=${params.roomId}${params.cursor ? '&cursor=' + params.cursor : ''}`
    ),
  getGroupList: () => getRequest<GroupListResp>(urls.getGroupList)

  /** 角色模块 */
}
