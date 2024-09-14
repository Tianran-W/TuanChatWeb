/* 常量 */
const reconnectCountMax = 100 // 重连次数上限
const heartBeatGap = 10000 // 心跳检测间隔

let connection: WebSocket // socket实例
let heartTimer: number | null = null // 心跳检测间隔标记符
let reconnectCount = 0 // 重连次数
let timer: null | number = null // 重连定时器
let lockReconnect = false // 是否重连中
let token: null | string = null // token

// 发消息给主进程
const postMsg = ({ type, value }: { type: string; value?: object }) => {
  self.postMessage(JSON.stringify({ type, value }))
}

// 初始化 ws 连接
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

// 往 ws 发消息
const connectionSend = (value: object) => {
  connection?.send(JSON.stringify(value))
}

const sendHeartPack = () => {
  heartTimer = setInterval(() => {
    connectionSend({ type: 2 })
  }, heartBeatGap)
}

const clearHeartPackTimer = () => {
  if (heartTimer) {
    clearInterval(heartTimer)
    heartTimer = null
  }
}

const onCloseHandler = () => {
  clearHeartPackTimer()
  // 已经在连接中就不重连了
  if (lockReconnect) return

  // 标识重连中
  lockReconnect = true

  // 清除 timer，避免任务堆积。
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  // 达到重连次数上限
  if (reconnectCount >= reconnectCountMax) {
    reconnectCount = 0
    return
  }

  // 断线重连
  timer = setTimeout(() => {
    initConnection()
    reconnectCount++
    // 标识已经开启重连任务
    lockReconnect = false
  }, 2000)
}

// ws 连接 error
const onConnectError = () => {
  onCloseHandler()
  postMsg({ type: 'error' })
}

// ws 连接 close
const onConnectClose = () => {
  onCloseHandler()
  token = null
  postMsg({ type: 'close' })
}

// ws 连接成功
const onConnectOpen = () => {
  postMsg({ type: 'open' })
  // 心跳❤️检测
  sendHeartPack()
}

// ws 连接 接收到消息
const onConnectMsg = (e: any) => postMsg({ type: 'message', value: e.data })

self.onmessage = (e: MessageEvent<string>) => {
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
