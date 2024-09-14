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

export type MessageType = {
  /** 消息id */
  messageId: number
  /** 发送者id */
  roleId: number
  /** 发送者名 */
  roleName: string
  /** 发送者头像 */
  roleAvatar: string
  /** 消息内容 */
  content: string
  /** 发送时间 */
  sendTime: string
}
