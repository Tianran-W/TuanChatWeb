import type { MsgEnumToBody } from '@/stores/types'
import { MsgEnum, WsReqEnum } from '@/enums'

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
