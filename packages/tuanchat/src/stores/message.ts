import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { tuanApis } from '@/services'
import type { Message } from '@/services'
import type { WsReqType } from '@/utils/websocket/types'

import wsIns from '@/utils/websocket/websocket'

const pageSize = 10

export const useMsgStore = defineStore('chat', () => {
  const messagesList = reactive<Map<number, Message[]>>(new Map<number, Message[]>())
  const cursorMap = new Map<number, string>()
  const isLoaded = new Map<number, boolean>()
  const ws = wsIns

  function pushMsg(msg: Message) {
    const roomId = msg.roomId!
    if (messagesList.has(roomId)) {
      messagesList.get(roomId)?.push(msg)
    } else {
      fetchMsg(roomId, pageSize).then(() => {
        messagesList.get(roomId)?.push(msg)
      })
    }
  }

  function fetchMsg(roomId: number, size: number = pageSize) {
    return new Promise((resolve, reject) => {
      if (isLoaded.get(roomId)) {
        resolve('No more message')
        return
      }

      tuanApis
        .getMsgPage({
          pageSize: size,
          roomId: roomId,
          cursor: cursorMap.get(roomId) || undefined
        })
        .then((res) => {
          if (res.data.data === undefined) {
            reject(new Error('Fetch message failed'))
            return
          }
          const data = res.data.data
          if (data.isLast) {
            isLoaded.set(roomId, true)
          }
          const msgs = data.list!.map((msg) => msg.message).filter((item) => item !== undefined)
          if (msgs.length > 0) {
            cursorMap.set(roomId, data.cursor!)
            if (messagesList.has(roomId)) {
              messagesList.get(roomId)?.unshift(...msgs)
            } else {
              messagesList.set(roomId, msgs)
            }
          }
          cursorMap.set(roomId, data.cursor!)
          resolve('Fetch message success')
        })
    })
  }

  function sendMsg(msg: string, roomId: number, roleId: number, avatarId: number) {
    const wsReq: WsReqType = {
      type: 3,
      data: {
        roomId: roomId,
        roleId: roleId,
        avatarId: avatarId,
        msgType: 1,
        body: {
          content: msg
        }
      }
    }
    ws.send(wsReq)
  }

  return { messagesList, pushMsg, fetchMsg, sendMsg }
})
