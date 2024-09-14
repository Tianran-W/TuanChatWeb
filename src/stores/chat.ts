import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MessageType } from './types'

export const useChatStore = defineStore('chat', () => {
  const isSign = ref(false)

  function pushMsg(msg: MessageType) {
    console.log('pushMsg', msg)
  }

  return { isSign, pushMsg }
})
