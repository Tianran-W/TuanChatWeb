import type { LoginResp, MessageListResp } from '@/services/types'
import type { LoginParam, MessageListParam } from '@/services/types'
import { userAlovaIns } from './requests'
import urls from './urls'

const getRequest = <T>(url: string, config?: any) =>
  userAlovaIns.Get<T>(url, { ...config, localCache: 0 })
const postRequest = <T>(url: string, params?: any) => userAlovaIns.Post<T, unknown>(url, params)

export default {
  /** 登录 */
  login: (params: LoginParam) => postRequest<LoginResp>(urls.postLogin, params),

  /** 接受消息 */
  getMessageList: (params: MessageListParam) =>
    getRequest<MessageListResp>(
      urls.getMessageList + '?pageSize=' + params.pageSize + '&roomId=' + params.roomId,
      params.cursor
    )
}
