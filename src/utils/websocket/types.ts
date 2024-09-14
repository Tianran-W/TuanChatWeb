/**
 * socket消息类型
 */
export enum WsResponseMessageType {
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

export type WsReqMsgContentType = {
  type: WsReqMsgType
  data?: Record<string, unknown>
}

export enum WsReqMsgType {
  /** 心跳检测 */
  HeartBeatDetection
}
