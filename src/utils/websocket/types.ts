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
  data?: Record<string, unknown>
}

export enum WsReqEnum {
  /** 第三方登录 */
  ThirdLogin = 1,
  /** 心跳检测 */
  HeartBeatDetection = 2,
  /** 发送消息 */
  SendMessage = 3
}
