import type { MsgType } from '@/stores/types'

//*********************返回体类型************************
export type LoginResp = string

export type RegisterResp = null

export type MessageListResp = {
  cursor: number
  isLast: boolean
  list: {
    message: MsgType
  }[]
}

export type GroupMemberResp = {
  uid: number
  roleId: number
}[]

export type UserInfoResp = {
  userId: number
  username: string
  userMark: number
  userLevel: number
  avatar: string
  ipInfo: string
  activeStatus: number
  lastLoginTime: string
  createTime: string
  updateTime: string
}

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

export type RoleAvatarResp = {
  roleId: number
  avatarId: string
  avatarTitle: string
  avatarUrl: string
  createTime: string
}

//*********************参数类型************************
export type LoginParam = {
  userId: number
  password: string
}

export type RegisterParam = {
  username: string
  password: string
}

export type MessageListParam = {
  roomId: number
  pageSize: number
  cursor?: number
}

export type GroupMemberParam = {
  roomId: number
}

export type UserInfoParam = {
  userId: number
}

export type RoleAvatarParam = {
  roleId: number
}
