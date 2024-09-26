import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useMsgStore } from './message'
import { useGroupStore } from './group'

const pinia = createPinia()

export default pinia
export { useUserStore, useMsgStore, useGroupStore }
