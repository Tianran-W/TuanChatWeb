import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { MsgObject } from '@/services/types'
import apis from '@/services/apis'
import { useGroupStore } from './group'
import wsIns from '@/utils/websocket/websocket'

const pageSize = 10

export const useMsgStore = defineStore('chat', () => {
  const cacheMessages = reactive(new Map<number, MsgObject[]>())
  const curMessages = ref<MsgObject[]>([])
  const cursorMap = new Map<number, number>()
  const curGroup = useGroupStore().currentGroup

  function pushMsg(msg: MsgObject) {
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
      apis
        .getMessageList({
          pageSize: size,
          roomId: roomId,
          cursor: cursorMap.get(roomId) || undefined
        })
        .then((data) => {
          if (data !== undefined) {
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

  return { cacheMessages, curMessages, pushMsg, switchRoom, fetchMsg }
})
