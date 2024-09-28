/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface FriendApproveReq {
  /** @format int64 */
  applyId: number
  applyStatus: 'WAIT_APPROVAL' | 'AGREE' | 'IGNORE'
}

export interface ApiResultVoid {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: object
}

export interface ChatMessageRequest {
  /** @format int64 */
  roomId: number
  /** @format int32 */
  msgType: number
  /** @format int64 */
  roleId?: number
  /** @format int64 */
  avatarId?: number
  body: object
}

export interface ApiResultTextMsgResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: TextMsgResp
}

export interface TextMsgResp {
  content?: string
}

export interface ChatMessageMarkRequest {
  /** @format int64 */
  syncId: number
  /** @format int64 */
  roomId: number
  /** @format int32 */
  markType: number
  /** @format int32 */
  actType: number
  /** @format int64 */
  avatarId: number
}

export interface UserLoginRequest {
  userId?: string
  password?: string
}

export interface ApiResultString {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: string
}

export interface FriendApplyReq {
  msg: string
  /** @format int64 */
  targetUid: number
}

export interface GroupMember {
  /** @format int64 */
  userId?: number
  /** @format int64 */
  roleId?: number
  roleName?: string
  /** @format int64 */
  avatarId?: number
}

export interface SubRoomRequest {
  /** @format int64 */
  parentRoomId?: number
  groupMembers?: GroupMember[]
}

export interface ApiResultRoom {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: Room
}

export interface Room {
  /** @format int64 */
  roomId?: number
  /** @format int32 */
  type?: number
  /** @format int64 */
  lastMessageId?: number
  /** @format date-time */
  createTime?: string
  /** @format date-time */
  updateTime?: string
  /** @format date-time */
  lastActiveTime?: string
}

export interface RoleAbilityTable {
  /** @format int64 */
  roleId?: number
  /** @format int32 */
  strength?: number
  /** @format int32 */
  dexterity?: number
  /** @format int32 */
  willpower?: number
  /** @format int32 */
  constitution?: number
  /** @format int32 */
  appearance?: number
  /** @format int32 */
  education?: number
  /** @format int32 */
  size?: number
  /** @format int32 */
  intelligence?: number
  /** @format int32 */
  sanity?: number
  /** @format int32 */
  luck?: number
  /** @format int32 */
  magicPoints?: number
  /** @format int32 */
  healthPoints?: number
  /** @format int32 */
  accounting?: number
  /** @format int32 */
  anthropology?: number
  /** @format int32 */
  appraisal?: number
  /** @format int32 */
  archaeology?: number
  /** @format int32 */
  acting?: number
  /** @format int32 */
  charm?: number
  /** @format int32 */
  climb?: number
  /** @format int32 */
  computerUse?: number
  /** @format int32 */
  creditRating?: number
  /** @format int32 */
  cthulhuMythos?: number
  /** @format int32 */
  disguise?: number
  /** @format int64 */
  dodge?: number
  /** @format int32 */
  drive?: number
  /** @format int32 */
  electricRepair?: number
  /** @format int32 */
  electronics?: number
  /** @format int32 */
  fastTalk?: number
  /** @format int32 */
  fistfight?: number
  /** @format int32 */
  firearms?: number
  /** @format int32 */
  firstAid?: number
  /** @format int32 */
  history?: number
  /** @format int32 */
  intimidate?: number
  /** @format int32 */
  jump?: number
  /** @format int32 */
  english?: number
  /** @format int32 */
  russian?: number
  /** @format int32 */
  law?: number
  /** @format int32 */
  libraryUse?: number
  /** @format int32 */
  listen?: number
  /** @format int32 */
  locksmith?: number
  /** @format int32 */
  machineRepair?: number
  /** @format int32 */
  medicine?: number
  /** @format int32 */
  naturalWorld?: number
  /** @format int32 */
  navigation?: number
  /** @format int32 */
  occult?: number
  /** @format int32 */
  persuade?: number
  /** @format int32 */
  psychology?: number
  /** @format int32 */
  ride?: number
  /** @format int32 */
  pharmacy?: number
  /** @format int32 */
  sleightOfHand?: number
  /** @format int32 */
  investigation?: number
  /** @format int32 */
  stealth?: number
  /** @format int32 */
  survival?: number
  /** @format int32 */
  swim?: number
  /** @format int32 */
  throwAbility?: number
  /** @format int32 */
  track?: number
  /** @format int32 */
  animalTraining?: number
  /** @format int32 */
  demolition?: number
  /** @format int32 */
  lipReading?: number
  /** @format int32 */
  hypnosis?: number
  /** @format int32 */
  artillery?: number
}

export interface ApiResultObject {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: object
}

export interface ApiResult {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: object
}

export interface ApiResultUserInfoResponse {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: UserInfoResponse
}

export interface UserInfoResponse {
  /** @format int64 */
  userId?: number
  username?: string
  userMark?: number
  /** @format int32 */
  userLevel?: number
  avatar?: string
  ipInfo?: string
  /** @format byte */
  activeStatus?: string
  /** @format date-time */
  lastLoginTime?: string
  /** @format date-time */
  createTime?: string
  /** @format date-time */
  updateTime?: string
  roles?: UserRole[]
}

export interface UserRole {
  /** @format int64 */
  userId?: number
  /** @format int64 */
  roleId?: number
  roleName?: string
  description?: string
  /** @format date-time */
  createTime?: string
  /** @format date-time */
  updateTime?: string
  avatar?: string
}

export interface CursorPageBaseReq {
  /** @format int32 */
  pageSize?: number
  cursor?: string
}

export interface ApiResultCursorPageBaseResponseFriendResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: CursorPageBaseResponseFriendResp
}

export interface CursorPageBaseResponseFriendResp {
  cursor?: string
  isLast?: boolean
  list?: FriendResp[]
}

export interface FriendResp {
  /** @format int64 */
  uid?: number
  /** @format int32 */
  activeStatus?: number
}

export interface FriendCheckReq {
  uidList: number[]
}

export interface ApiResultFriendCheckResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: FriendCheckResp
}

export interface FriendCheck {
  /** @format int64 */
  uid?: number
  isFriend?: boolean
}

export interface FriendCheckResp {
  checkedList?: FriendCheck[]
}

export interface ApiResultFriendUnreadResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: FriendUnreadResp
}

export interface FriendUnreadResp {
  /** @format int64 */
  unReadCount?: number
}

export interface PageBaseReq {
  /** @format int32 */
  pageSize?: number
  /** @format int32 */
  pageNo?: number
}

export interface ApiResultPageBaseRespFriendApplyResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: PageBaseRespFriendApplyResp
}

export interface FriendApplyResp {
  /** @format int64 */
  uid?: number
  msg?: string
  /** @format int64 */
  status?: number
}

export interface PageBaseRespFriendApplyResp {
  /** @format int32 */
  pageNo?: number
  /** @format int32 */
  pageSize?: number
  /** @format int64 */
  totalRecords?: number
  isLast?: boolean
  list?: FriendApplyResp[]
}

export interface ApiResultRoomResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: RoomResp
}

export interface RoomResp {
  /** @format int64 */
  roomId?: number
  groupName?: string
  avatar?: string
  /** @format int32 */
  groupType?: number
}

export interface ApiResultListUserRole {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: UserRole[]
}

export interface ApiResultListChatMemberResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: ChatMemberResp[]
}

export interface ChatMemberResp {
  /** @format int64 */
  uid?: number
  /** @format int64 */
  roleId?: number
  /** @format int32 */
  memberType?: number
}

export interface ApiResultListRoomGroup {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: RoomGroup[]
}

export interface RoomGroup {
  /** @format int64 */
  roomId?: number
  name?: string
  avatar?: string
  description?: string
  /** @format int32 */
  deleteStatus?: number
  /** @format date-time */
  createTime?: string
  /** @format date-time */
  updateTime?: string
  /** @format int64 */
  parentGroupId?: number
}

export interface ApiResultUserRole {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: UserRole
}

export interface ApiResultListRoleAvatar {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: RoleAvatar[]
}

export interface RoleAvatar {
  /** @format int64 */
  roleId?: number
  /** @format int64 */
  avatarId?: number
  avatarTitle?: string
  avatarUrl?: string
  /** @format date-time */
  createTime?: string
  /** @format date-time */
  updateTime?: string
}

export interface ApiResultRoleAbilityTable {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: RoleAbilityTable
}

export interface UploadUrlReq {
  fileName: string
  /** @format int32 */
  scene: number
}

export interface ApiResultOssResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: OssResp
}

export interface OssResp {
  uploadUrl?: string
  downloadUrl?: string
}

export interface ChatMessagePageRequest {
  /** @format int32 */
  pageSize?: number
  cursor?: string
  /** @format int64 */
  roomId: number
}

export interface ApiResultCursorPageBaseResponseChatMessageResponse {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: CursorPageBaseResponseChatMessageResponse
}

export interface ChatMessageResponse {
  message?: Message
  messageMark?: MessageMark
}

export interface CursorPageBaseResponseChatMessageResponse {
  cursor?: string
  isLast?: boolean
  list?: ChatMessageResponse[]
}

export interface Message {
  /** @format int64 */
  uid?: number
  /** @format int64 */
  roleId?: number
  /** @format int64 */
  avatarId?: number
  /** @format int64 */
  syncId?: number
  /** @format int64 */
  roomId?: number
  /** @format date-time */
  sendTime?: string
  /** @format int32 */
  messageType?: number
  body?: object
}

export interface MessageMark {
  /** @format int32 */
  likeCount?: number
  /** @format int32 */
  userLike?: number
  /** @format int32 */
  dislikeCount?: number
  /** @format int32 */
  userDislike?: number
}

export interface ApiResultCursorPageBaseResponseChatRoomResp {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: CursorPageBaseResponseChatRoomResp
}

export interface ChatRoomResp {
  /** @format int64 */
  roomId?: number
  /** @format int32 */
  type?: number
  text?: string
  name?: string
  avatar?: string
  /** @format date-time */
  activeTime?: string
  /** @format int64 */
  unreadCount?: number
}

export interface CursorPageBaseResponseChatRoomResp {
  cursor?: string
  isLast?: boolean
  list?: ChatRoomResp[]
}

export interface ApiResultRoleAvatar {
  success?: boolean
  /** @format int32 */
  errCode?: number
  errMsg?: string
  data?: RoleAvatar
}

export interface FriendDeleteReq {
  /** @format int64 */
  targetUid: number
}

/** 发送消息请求体 */
export interface GeneralMessage {
  /** 会话id */
  roomId: number
  /** 消息类型 1文本消息 2撤回消息 3.图片消息 4.文件 5.语音 6视频 */
  msgType: number
  /** 消息内容 根据类型不同请求不同 */
  body: object
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title 团剧共创
 * @version 1.0.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  capi = {
    /**
     * No description
     *
     * @tags user-controller
     * @name Login
     * @summary login
     * @request POST:/capi/user/public/login
     * @secure
     */
    login: (data: UserLoginRequest, params: RequestParams = {}) =>
      this.request<ApiResultString, any>({
        path: `/capi/user/public/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags user-controller
     * @name GetUserInfo
     * @summary getUserInfo
     * @request GET:/capi/user/info
     * @secure
     */
    getUserInfo: (
      query: {
        /**
         * @format int64
         * @example 1
         */
        userId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultUserInfoResponse, any>({
        path: `/capi/user/info`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name Apply
     * @summary apply
     * @request POST:/capi/user/friend/apply
     * @secure
     */
    apply: (data: FriendApplyReq, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/capi/user/friend/apply`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @name UserFriendApplyList
     * @summary 好友审批同意或忽略
     * @request GET:/capi/user/friend/apply
     * @secure
     */
    userFriendApplyList: (data: object, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/capi/user/friend/apply`,
        method: 'GET',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name ApplyApprove
     * @summary applyApprove
     * @request PUT:/capi/user/friend/apply
     * @secure
     */
    applyApprove: (data: FriendApproveReq, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/capi/user/friend/apply`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name FriendList
     * @summary friendList
     * @request GET:/capi/user/friend/page
     * @secure
     */
    friendList: (
      query?: {
        /**
         * @format int32
         * @example 0
         */
        pageSize?: number
        /** @example "" */
        cursor?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultCursorPageBaseResponseFriendResp, any>({
        path: `/capi/user/friend/page`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name Check
     * @summary check
     * @request GET:/capi/user/friend/check
     * @secure
     */
    check: (
      query: {
        /** @example "" */
        uidList: number[]
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultFriendCheckResp, any>({
        path: `/capi/user/friend/check`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @name UserPublicRegisterCreate
     * @summary 注册
     * @request POST:/capi/user/public/register
     * @secure
     */
    userPublicRegisterCreate: (
      data: {
        username: string
      },
      params: RequestParams = {}
    ) =>
      this.request<object, any>({
        path: `/capi/user/public/register`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name Unread
     * @summary unread
     * @request GET:/capi/user/friend/apply/unread
     * @secure
     */
    unread: (params: RequestParams = {}) =>
      this.request<ApiResultFriendUnreadResp, any>({
        path: `/capi/user/friend/apply/unread`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name Page
     * @summary page
     * @request GET:/capi/user/friend/apply/page
     * @secure
     */
    page: (
      query?: {
        /**
         * @format int32
         * @example 0
         */
        pageSize?: number
        /**
         * @format int32
         * @example 0
         */
        pageNo?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultPageBaseRespFriendApplyResp, any>({
        path: `/capi/user/friend/apply/page`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags friend-controller
     * @name Delete
     * @summary delete
     * @request DELETE:/capi/user/friend
     * @secure
     */
    delete: (data: FriendDeleteReq, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/capi/user/friend`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags oss-controller
     * @name GetUploadUrl
     * @summary getUploadUrl
     * @request GET:/capi/oss/upload/url
     * @secure
     */
    getUploadUrl: (
      query: {
        /** @example "" */
        fileName: string
        /**
         * @format int32
         * @example 0
         */
        scene: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultOssResp, any>({
        path: `/capi/oss/upload/url`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags contact-controller
     * @name GetRoomPage
     * @summary getRoomPage
     * @request GET:/capi/chat/contact/page
     * @secure
     */
    getRoomPage: (
      query?: {
        /**
         * @format int32
         * @example 0
         */
        pageSize?: number
        /** @example "" */
        cursor?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultCursorPageBaseResponseChatRoomResp, any>({
        path: `/capi/chat/contact/page`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags chat-controller
     * @name SendMessage
     * @summary sendMessage
     * @request POST:/capi/chat/message
     * @secure
     */
    sendMessage: (data: ChatMessageRequest, params: RequestParams = {}) =>
      this.request<ApiResult, any>({
        path: `/capi/chat/message`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags chat-controller
     * @name UpdateMessage
     * @summary updateMessage
     * @request PUT:/capi/chat/message
     * @secure
     */
    updateMessage: (data: ChatMessageRequest, params: RequestParams = {}) =>
      this.request<ApiResultTextMsgResp, any>({
        path: `/capi/chat/message`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags room-controller
     * @name GroupDetail
     * @summary groupDetail
     * @request GET:/capi/room/info
     * @secure
     */
    groupDetail: (
      query: {
        /**
         * @format int64
         * @example 1
         */
        roomId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultRoomResp, any>({
        path: `/capi/room/info`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags chat-controller
     * @name SetMsgMark
     * @summary setMsgMark
     * @request PUT:/capi/chat/message/mark
     * @secure
     */
    setMsgMark: (data: ChatMessageMarkRequest, params: RequestParams = {}) =>
      this.request<ApiResultVoid, any>({
        path: `/capi/chat/message/mark`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags chat-controller
     * @name GetMsgPage
     * @summary getMsgPage
     * @request GET:/capi/chat/message/page
     * @secure
     */
    getMsgPage: (
      query: {
        /**
         * @format int32
         * @example 0
         */
        pageSize?: number
        /** @example "" */
        cursor?: string
        /**
         * @format int64
         * @example 0
         */
        roomId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultCursorPageBaseResponseChatMessageResponse, any>({
        path: `/capi/chat/message/page`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags room-controller
     * @name GroupRole
     * @summary groupRole
     * @request GET:/capi/room/group/roles
     * @secure
     */
    groupRole: (
      query: {
        /**
         * @format int64
         * @example 1
         */
        roomId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultListUserRole, any>({
        path: `/capi/room/group/roles`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags room-controller
     * @name GetMemberPage
     * @summary getMemberPage
     * @request GET:/capi/room/group/member/page
     * @secure
     */
    getMemberPage: (
      query: {
        /** @format int64 */
        roomId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultListChatMemberResp, any>({
        path: `/capi/room/group/member/page`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags room-controller
     * @name GetUserGroups
     * @summary getUserGroups
     * @request GET:/capi/room/group/list
     * @secure
     */
    getUserGroups: (params: RequestParams = {}) =>
      this.request<ApiResultListRoomGroup, any>({
        path: `/capi/room/group/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @name RoomCreateSubgroupList
     * @summary 创建子群
     * @request GET:/capi/room/create/subgroup
     * @secure
     */
    roomCreateSubgroupList: (data: object, params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/capi/room/create/subgroup`,
        method: 'GET',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @name RoomCreatePrivatechatList
     * @summary 创建私聊
     * @request GET:/capi/room/create/privatechat
     * @secure
     */
    roomCreatePrivatechatList: (data: object, params: RequestParams = {}) =>
      this.request<
        {
          success: boolean
          errCode: null
          errMsg: null
          data: {
            roomId: number
            type: number
            lastMessageId: null
            createTime: string
            updateTime: string
            lastActiveTime: null
          }
        },
        any
      >({
        path: `/capi/room/create/privatechat`,
        method: 'GET',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetRoleAbility
     * @summary getRoleAbility
     * @request GET:/capi/role/ability
     * @secure
     */
    getRoleAbility: (
      query: {
        /**
         * @format int64
         * @example 1
         */
        roleId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultRoleAbilityTable, any>({
        path: `/capi/role/ability`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name SetRoleAbility
     * @summary setRoleAbility
     * @request POST:/capi/role/ability
     * @secure
     */
    setRoleAbility: (data: RoleAbilityTable, params: RequestParams = {}) =>
      this.request<ApiResultObject, any>({
        path: `/capi/role/ability`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetRole
     * @summary getRole
     * @request GET:/capi/role
     * @secure
     */
    getRole: (
      query: {
        /**
         * @format int64
         * @example 1
         */
        roleId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultUserRole, any>({
        path: `/capi/role`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags role-controller
     * @name GetRoleAvatars
     * @summary getRoleAvatars
     * @request GET:/capi/role/avatar
     * @secure
     */
    getRoleAvatars: (
      query: {
        /**
         * @format int64
         * @example 1
         */
        roleId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultListRoleAvatar, any>({
        path: `/capi/role/avatar`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags room-controller
     * @name CreateSubgroup
     * @summary createSubgroup
     * @request POST:/capi/room/subgroup
     * @secure
     */
    createSubgroup: (data: SubRoomRequest, params: RequestParams = {}) =>
      this.request<ApiResultRoom, any>({
        path: `/capi/room/subgroup`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags room-controller
     * @name CreatePrivateChat
     * @summary createPrivateChat
     * @request POST:/capi/room/friend
     * @secure
     */
    createPrivateChat: (data: SubRoomRequest, params: RequestParams = {}) =>
      this.request<ApiResultRoom, any>({
        path: `/capi/room/friend`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags avatar-controller
     * @name GetRoleAvatar
     * @summary getRoleAvatar
     * @request GET:/capi/avatar
     * @secure
     */
    getRoleAvatar: (
      query: {
        /**
         * ID 编号
         * @format int64
         * @example 1
         */
        avatarId: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ApiResultRoleAvatar, any>({
        path: `/capi/avatar`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  }
}
