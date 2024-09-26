import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { MsgType } from '@/stores/types'
import { api as tuanApis } from '@/services/tuanchat'
import { useGroupStore } from './group'
import wsIns from '@/utils/websocket/websocket'
import type { WsReqType } from '@/utils/websocket/types'

const pageSize = 10

export const useMsgStore = defineStore('chat', () => {
  const cacheMessages = reactive(new Map<number, MsgType[]>())
  const curMessages = ref<MsgType[]>([])
  const cursorMap = new Map<number, number>()
  const isLoaded = new Map<number, boolean>()
  const curGroup = useGroupStore().currentGroup
  const ws = wsIns

  function pushMsg(msg: MsgType) {
    const roomId = msg.roomId
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
        .getMessageList({
          pageSize: size,
          roomId: roomId,
          cursor: cursorMap.get(roomId)
        })
        .then((data) => {
          if (data !== undefined) {
            if (data.isLast) {
              isLoaded.set(roomId, true)
            }
            const msgs = data.list.map((msg) => msg.message)
            console.log('fetchMsg', msgs)
            if (msgs.length > 0) {
              cursorMap.set(roomId, data.cursor)
              if (cacheMessages.has(roomId)) {
                cacheMessages.get(roomId)?.unshift(...msgs)
              } else {
                cacheMessages.set(roomId, msgs)
              }
            }
            cursorMap.set(roomId, data.cursor)
            resolve('Fetch message success')
          } else {
            reject(new Error('Fetch message failed'))
          }
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
