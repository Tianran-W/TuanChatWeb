import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useMsgStore } from './message'

export const useRoomStore = defineStore('room', () => {
  const msgStore = useMsgStore()
  const cachedRoomList = reactive(new Map<number, boolean>()) // true为群，false为私聊，有key代表在缓存中
  const curRoomId = ref<number>(0)

  function switchRoom(roomId: number) {
    curRoomId.value = roomId
    if (cachedRoomList.has(roomId)) {
      initRoom(roomId)
    } else {
      loadRoom(roomId)
      //TODO：加载私聊信息
      cachedRoomList.set(roomId, true)
    }
  }

  function initRoom(roomId: number) {
    msgStore.fetchMsg(roomId).then(() => {
      msgStore.curMessages = msgStore.messagesList.get(roomId) || []
    })
  }

  function loadRoom(roomId: number) {
    msgStore.curMessages = msgStore.messagesList.get(roomId) || []
  }

  return { curRoomId, switchRoom }
})
