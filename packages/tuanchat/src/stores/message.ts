import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Message } from '@/services/tuanchat/Api'
import { tuanApis } from '@/services'
import { useGroupStore } from './group'
import wsIns from '@/utils/websocket/websocket'
import type { WsReqType } from '@/utils/websocket/types'

const pageSize = 10

export const useMsgStore = defineStore('chat', () => {
  const cacheMessages = reactive(new Map<number, Message[]>())
  const curMessages = ref<Message[]>([])
  const cursorMap = new Map<number, string>()
  const isLoaded = new Map<number, boolean>()
  const curGroup = useGroupStore().currentGroup
  const ws = wsIns

  function pushMsg(msg: Message) {
    const roomId = msg.roomId!
    if (cacheMessages.has(roomId)) {
      cacheMessages.get(roomId)?.push(msg)
    } else {
      fetchMsg(roomId, pageSize).then(() => {
        cacheMessages.get(roomId)?.push(msg)
      })
    }
    if (roomId === curGroup) {
      curMessages.value.push(msg)
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
            if (cacheMessages.has(roomId)) {
              cacheMessages.get(roomId)?.unshift(...msgs)
            } else {
              cacheMessages.set(roomId, msgs)
            }
          }
          cursorMap.set(roomId, data.cursor!)
          resolve('Fetch message success')
        })
    })
  }

  function switchRoom(roomId: number) {
    const groupStore = useGroupStore()
    groupStore.currentGroup = roomId
    if (!cacheMessages.has(roomId)) {
      fetchMsg(roomId).then(() => {
        curMessages.value = cacheMessages.get(roomId) || []
      })
    } else {
      curMessages.value = cacheMessages.get(roomId) || []
    }
  }

  function sendMsg(msg: string, roomId: number) {
    const wsReq: WsReqType = {
      type: 3,
      data: {
        roomId: roomId,
        roleId: 1,
        avatarId: 1,
        msgType: 1,
        body: {
          content: msg
        }
      }
    }
    ws.send(wsReq)
  }

  return { cacheMessages, curMessages, pushMsg, switchRoom, fetchMsg, sendMsg }
})
