/**
 * 消息相关枚举文件
 * 定义规则：
 *  枚举名：XxxEnum
 *  枚举值：全部大写，单词间用下划线分割
 */
/** -------------------------------------- */

/**
 * 消息类型
 */
export enum MsgEnum {
  /** 未知 */
  UNKNOWN,
  /** 文本 */
  TEXT,
  /** 撤回 */
  RECALL,
  /** 图片 */
  IMAGE,
  /** 文件 */
  FILE,
  /** 语音 */
  VOICE,
  /** 视频 */
  VIDEO
}

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

export enum WsReqEnum {
  /** 第三方登录 */
  ThirdLogin = 1,
  /** 心跳检测 */
  HeartBeatDetection = 2,
  /** 发送消息 */
  SendMessage = 3
}
