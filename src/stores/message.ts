import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { MsgObject } from '@/services/types'
import apis from '@/services/apis'
import wsIns from '@/utils/websocket/websocket'

const pageSize = 10

export const useMsgStore = defineStore('chat', () => {
  const cacheMessages = reactive(new Map<number, MsgObject[]>())
  const curMessages = ref<MsgObject[]>([])
  const cursorMap = new Map<number, number>()

  function pushMsg(msg: MsgObject) {
    console.log('pushMsg', msg)
  }

  async function fetchMsg(roomId: number, size: number) {
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
            if (msgs.length > 0) {
              cursorMap.set(roomId, data.cursor)
              if (cacheMessages.has(roomId)) {
                cacheMessages.set(
                  roomId,
                  msgs.concat(cacheMessages.get(roomId) as MsgObject[]) || []
                )
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
    if (!cacheMessages.has(roomId)) {
      fetchMsg(roomId, pageSize).then(() => {
        curMessages.value = cacheMessages.get(roomId) || []
      })
    } else {
      curMessages.value = cacheMessages.get(roomId) || []
    }
  }

  return { cacheMessages, curMessages, pushMsg, switchRoom }
})
