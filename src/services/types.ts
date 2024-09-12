/**
 * 类型定义文件
 * 注意：请使用TSDoc规范进行注释，以便在使用时能够获得良好提示。
 * @see TSDoc规范 https://tsdoc.org/
 **/

import { MsgEnum } from '@/enums/MessageType'

//*********************返回体类型************************
/** 登录返回体*/
export type LoginResp = string

/** 注册返回体*/
export type RegisterResp = null

/** 发送消息返回体*/
export type SendMessageResp = null

/** 获取消息列表返回体*/
export type MessageListResp = {
  cursor: number
  isLast: boolean
  list: MsgObject[]
}

/** 获取群成员列表 */
export type GroupMemberResp = {
  uid: number
  roleId: number
}[]

/** 获取用户信息 */
export type UserInfoResp = {
  /** 用户id */
  userId: number
  /** 用户名 */
  username: string
  /** 用户标签 */
  userMark: number
  /** 用户等级 */
  userLevel: number
  /** 用户头像 */
  avatar: string
  /** ip信息 */
  ipInfo: string
  /** 活跃状态 */
  activeStatus: number
  /** 最后登录时间 */
  lastLoginTime: string
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  updateTime: string
}

/** 获取群聊列表 */
export type GroupListResp = {
  roomId: number
  name: string
  avatar: string
  description: string
  deleteStatus: number
  createTime: string
  updateTime: string
  parentGroupId: number
}[]

//*********************参数类型************************
export type LoginParam = {
  /** 用户id */
  userId: number
  /** 密码 */
  password: string
}

export type RegisterParam = {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
}

export type MessageParam = {
  /** 房间id */
  roomId: number
  /** 发送者id */
  roleId: number
  /** 发送者头像id */
  avatarId: number
  /** 消息类型 */
  msgType: MsgEnum
  /** 消息体 */
  body: {
    /** 文本消息内容 */
    content: string
    /** 回复的消息id */
    replyMsgId?: number
    /** 指出的uid */
    atUidList?: number[]
  }
}

export type MessageListParam = {
  /** 房间id */
  roomId: number
  /** 页码 */
  pageSize: number
  /** 游标 */
  cursor: number
}

export type GroupMemberParam = {
  /** 房间id */
  roomId: number
}

export type UserInfoParam = {
  /** 房间id */
  userId: number
}

export type GroupListParam = null

//*********************自定义类型************************
export type MsgObject = {
  /** 发送用户id */
  uid: number
  /** 消息id */
  syncId: number
  /** 房间id */
  roomId: number
  /** 发送时间 */
  sendTime: string
  /** 消息类型 */
  messageType: MsgEnum
  /** 消息体 */
  content: string
  /** 消息标记 */
  messageMark: string
}

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
