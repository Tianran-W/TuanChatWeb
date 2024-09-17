import { WsReqEnum } from './types'
import type { WsReqType } from './types'

/* 常量 */
const reconnectCountMax = 100 // 重连次数上限
const heartBeatGap = 10000 // 心跳检测间隔

let connection: WebSocket // socket实例
let heartTimer: number | null = null // 心跳检测间隔标记符
let reconnectCount: number = 0 // 重连次数
let reconnectTimer: null | number = null // 重连定时器
let lockReconnect: boolean = false // 是否重连中
let token: null | string = null // token

/** 主线程通信 */

const postMsg = ({ type, value }: { type: string; value?: object }) => {
  self.postMessage(JSON.stringify({ type, value }))
}

const initConnection = () => {
  connection?.removeEventListener('message', onConnectMsg)
  connection?.removeEventListener('open', onConnectOpen)
  connection?.removeEventListener('close', onConnectClose)
  connection?.removeEventListener('error', onConnectError)
  // 建立链接
  connection = new WebSocket(`${import.meta.env.VITE_WS_URL}${token ? `?token=${token}` : ''}`)
  connection.addEventListener('message', onConnectMsg)
  connection.addEventListener('open', onConnectOpen)
  connection.addEventListener('close', onConnectClose)
  connection.addEventListener('error', onConnectError)
}

const onConnectMsg = (e: any) => postMsg({ type: 'message', value: e.data })

const onConnectOpen = () => {
  postMsg({ type: 'open' })
  sendHeartPack()
}

const onConnectClose = () => {
  onCloseHandler()
  token = null
  postMsg({ type: 'close' })
}

const onConnectError = () => {
  onCloseHandler()
  postMsg({ type: 'error' })
}

const onCloseHandler = () => {
  clearHeartPackTimer()
  // 已经在连接中就不重连了
  if (lockReconnect) return

  // 标识重连中
  lockReconnect = true

  // 清除 timer，避免任务堆积。
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
  // 达到重连次数上限
  if (reconnectCount >= reconnectCountMax) {
    reconnectCount = 0
    return
  }

  // 断线重连
  reconnectTimer = setTimeout(() => {
    initConnection()
    reconnectCount++
    // 标识已经开启重连任务
    lockReconnect = false
  }, 2000)
}

const sendHeartPack = () => {
  heartTimer = setInterval(() => {
    connection?.send(JSON.stringify({ type: WsReqEnum.HeartBeatDetection }))
  }, heartBeatGap)
}

const clearHeartPackTimer = () => {
  if (heartTimer) {
    clearInterval(heartTimer)
    heartTimer = null
  }
}

self.onmessage = (e: MessageEvent<string>) => {
  console.log(e.data)
  const { type, value } = JSON.parse(e.data)
  switch (type) {
    case 'initWS': {
      reconnectCount = 0
      token = value
      initConnection()
      break
    }
    case 'message': {
      if (connection?.readyState !== 1) return
      connectionSend(value)
      break
    }
  }
}

/** socket通信 */

const connectionSend = (value: WsReqType) => {
  connection?.send(JSON.stringify(value))
}
