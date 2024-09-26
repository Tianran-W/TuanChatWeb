import type { MsgEnumToBody } from '@/stores/types'
import { MsgEnum } from '@/enums'

/**
 * socket消息类型
 */
export enum WsRespEnum {
  /** 消息 */
  MESSAGE = 4,
  /** 标记 */
  MARK = 8,
  /** 撤回 */
  RECALL = 9,
  /** 好友申请 */
  APPLY = 10,
  /** 成员变动 */
  MEMBER_CHANGE = 11
}

export type WsReqType = {
  type: WsReqEnum
  data: WsReqEnumToData[WsReqEnum]
}

type WsReqEnumToData = {
  [WsReqEnum.ThirdLogin]: ThirdLoginData
  [WsReqEnum.HeartBeatDetection]: undefined
  [WsReqEnum.SendMessage]: SendMessageData
}

type ThirdLoginData = {}

type SendMessageData = {
  roomId: number
  roleId: number
  avatarId: number
  messageType: MsgEnum
  body: MsgEnumToBody[MsgEnum]
}

export enum WsReqEnum {
  /** 第三方登录 */
  ThirdLogin = 1,
  /** 心跳检测 */
  HeartBeatDetection = 2,
  /** 发送消息 */
  SendMessage = 3
}
