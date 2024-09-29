import { ref } from 'vue'
import { defineStore } from 'pinia'
import { tuanApis } from '@/services'
import type { Message } from '@/services'
import type { WsReqType } from '@/utils/websocket/types'

import wsIns from '@/utils/websocket/websocket'

const pageSize = 10

export const useMsgStore = defineStore('chat', () => {
  const messagesList = ref<Map<number, Message[]>>(new Map<number, Message[]>())
  const cursorMap = new Map<number, string>()
  const isLoaded = new Map<number, boolean>()
  const ws = wsIns

  function pushMsg(msg: Message) {
    const roomId = msg.roomId!
    if (messagesList.value.has(roomId)) {
      messagesList.value.get(roomId)?.push(msg)
    } else {
      fetchMsg(roomId, pageSize).then(() => {
        messagesList.value.get(roomId)?.push(msg)
      })
    }
  }

  async function fetchMsg(roomId: number, size: number = pageSize) {
    if (isLoaded.get(roomId)) {
      return
    }

    const data = (
      await tuanApis.getMsgPage({
        pageSize: size,
        roomId: roomId,
        cursor: cursorMap.get(roomId) || undefined
      })
    ).data.data
    if (data === undefined) {
      throw new Error('Fetch message failed')
    }
    if (data.isLast) {
      isLoaded.set(roomId, true)
    }
    const msgs = data.list!.map((msg) => msg.message).filter((item) => item !== undefined)
    if (msgs.length > 0) {
      cursorMap.set(roomId, data.cursor!)
      if (messagesList.value.has(roomId)) {
        messagesList.value.get(roomId)?.unshift(...msgs)
      } else {
        messagesList.value.set(roomId, msgs)
      }
    }
    cursorMap.set(roomId, data.cursor!)
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
