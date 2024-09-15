import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MsgObject } from '@/services/types'
import wsIns from '@/utils/websocket/websocket'

export const useMsgStore = defineStore('chat', () => {
  const messages = ref<MsgObject[]>([])

  function pushMsg(msg: MsgObject) {
    messages.value.push(msg)
    console.log('pushMsg', msg)
  }

  return { messages, pushMsg }
})
