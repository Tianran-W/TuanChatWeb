import { createPinia } from 'pinia'
import { useUserStore } from './user'
import { useMsgStore } from './message'
import { useGroupStore } from './group'
import { useRoomStore } from './room'
import { useRoleStore } from './role'

const pinia = createPinia()

export default pinia
export { useUserStore, useMsgStore, useGroupStore, useRoomStore, useRoleStore }
