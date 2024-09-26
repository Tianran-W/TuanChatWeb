import { MsgEnum } from '@/enums/MessageType'

/** 用户信息 */
export type UserInfoType = {
  /** 用户id */
  userId: number
  /** 用户名 */
  username: string
  /** 头像 */
  avatar: string
  /** 角色id */
  roleIds: number[]
}

/** 用户信息 */
export type RoleInfoType = {
  /** 用户id */
  userId: number
  /** 角色id */
  roleId: number
  /** 角色名 */
  roleName: string
  /** 角色头像 */
  roleAvatar: string
}

/** 群聊信息 */
export type GroupInfoType = {
  roomId: number
  name: string
  avatar: string
  description: string
  deleteStatus: number
  createTime: string
  updateTime: string
  parentGroupId: number
}

export type MsgType = {
  roleId: number
  avatarId: number
  syncId: number
  roomId: number
  sendTime: string
  messageType: MsgEnum
  body: MsgEnumToBody[MsgEnum]
}

export type MsgEnumToBody = {
  [MsgEnum.UNKNOWN]: undefined
  [MsgEnum.TEXT]: TextBody
  [MsgEnum.RECALL]: RecallBody
  [MsgEnum.IMAGE]: ImageBody
  [MsgEnum.FILE]: FileBody
  [MsgEnum.VOICE]: VoiceBody
  [MsgEnum.VIDEO]: VideoBody
}

export type TextBody = {
  content: string
  replyMsgId?: number
  atUidList?: number[]
}

type RecallBody = {}

type ImageBody = {}

type FileBody = {}

type VoiceBody = {}

type VideoBody = {}
