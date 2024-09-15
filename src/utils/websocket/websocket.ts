import { useUserStore, useMsgStore } from '@/stores'
import { WsResponseMessageType } from './types'
import type { WsReqMsgContentType } from './types'
import type { MsgObject } from '@/services/types'

const worker: Worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module'
})

class WS {
  #tasks: WsReqMsgContentType[] = []
  #connectReady = false

  constructor() {
    this.initConnect()
    worker.addEventListener('message', this.onWorkerMsg)

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !this.#connectReady) {
        this.initConnect()
      }
    })
  }

  initConnect = () => {
    const token = localStorage.getItem('TOKEN')
    worker.postMessage(`{"type":"initWS","value":${token ? `"${token}"` : null}}`)
  }

  onWorkerMsg = (e: MessageEvent<any>) => {
    const params: { type: string; value: unknown } = JSON.parse(e.data)
    switch (params.type) {
      case 'message': {
        this.onMessage(params.value as string)
        break
      }
      case 'open': {
        this.#dealTasks()
        break
      }
      case 'close':
      case 'error': {
        this.#onClose()
        break
      }
    }
  }

  send = (params: WsReqMsgContentType) => {
    if (this.#connectReady) {
      this.#send(params)
    } else {
      // 放到队列
      this.#tasks.push(params)
    }
  }

  // 收到消息回调
  onMessage = (value: string) => {
    const params: { type: WsResponseMessageType; data: { message: MsgObject } } = JSON.parse(value)
    const msgStore = useMsgStore()
    switch (params.type) {
      case WsResponseMessageType.MESSAGE: {
        msgStore.pushMsg(params.data.message)
        break
      }
      default: {
        console.log('接收到未处理类型的消息:', params)
        break
      }
    }
  }

  // 重置一些属性
  #onClose = () => {
    this.#connectReady = false
  }

  #dealTasks = () => {
    this.#connectReady = true
    setTimeout(() => {
      const userStore = useUserStore()
      if (userStore.isSign) {
        // 处理堆积的任务
        this.#tasks.forEach((task) => {
          this.send(task)
        })
        // 清空缓存的消息
        this.#tasks = []
      }
    }, 500)
  }

  #send(msg: WsReqMsgContentType) {
    worker.postMessage(
      `{"type":"message","value":${typeof msg === 'string' ? msg : JSON.stringify(msg)}}`
    )
  }
}

export default new WS()
