import { createPinia } from 'pinia'
import type { MessageType } from './types'
import { useUserStore } from './user'
import { useChatStore } from './chat'

const pinia = createPinia()

export default pinia
export type { MessageType }
export { useUserStore, useChatStore }
