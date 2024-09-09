// 本地配置到 .env 里面修改。生产配置在 .env.production 里面
export default {
  // -------------- 用户模块 ---------------
  postLogin: `/capi/user/public/login`, // 登录请求
  postRegister: `/capi/user/public/register`, // 注册请求

  // -------------- 聊天模块 ---------------
  postMessage: `/capi/chat/message`, // 发送消息
  getMessageList: `/capi/chat/message/page`, // 获取消息列表
  getRoomInfo: `/capi/room/group`, // 获取群聊信息
  getRoomMember: `/capi/room/group/member/page`, // 获取群成员列表

  // -------------- 角色模块 ---------------
  getRole: `/capi/role/avatar`, // 获取角色头像
  setRoleAbility: `/capi/role/ability`, // 设置角色能力
  getRoleAbility: `/capi/role/ability` // 获取角色能力
}
