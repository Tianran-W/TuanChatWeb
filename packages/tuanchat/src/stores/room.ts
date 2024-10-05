import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMsgStore } from './message'
import { useGroupStore } from './group'
import { useRoleStore } from './role'
import { Renderer } from '@/utils/renderer'
import type { Message, UserRole, RoomGroup } from '@/services'

export const useRoomStore = defineStore('room', () => {
  const msgStore = useMsgStore()
  const groupStore = useGroupStore()
  const roleStore = useRoleStore()

  const cachedRoomList = ref(new Map<number, boolean>()) // true为群，false为私聊，有key代表在缓存中
  const curRoom = ref<RoomGroup>()
  const role = ref<UserRole>()
  const messages = ref<Message[]>([])
  const roleList = ref<UserRole[]>([])
  const usedAvatar = ref<number>(1)

  const renderers = new Map<number, Renderer>()

  async function switchRoom(roomId: number) {
    curRoom.value = groupStore.groupList.get(roomId)
    if (!cachedRoomList.value.has(roomId)) {
      await initRoom(roomId)
      //TODO：兼容私聊信息
      cachedRoomList.value.set(roomId, true)
    } else {
      await loadRoom(roomId)
    }
  }

  async function initRoom(roomId: number) {
    renderers.set(roomId, new Renderer(roomId))
    msgStore.fetchMsg(roomId).then(() => {
      messages.value = msgStore.messagesList.get(roomId)!
    })
    groupStore.fetchRoles(roomId).then(() => {
      roleList.value = groupStore.groupRoleList.get(roomId)!
      roleList.value.forEach((role) => {
        roleStore.fetchRoleAvatars(role.roleId!).then(() => {})
      })
    })
    roleStore.fetchRole(roomId).then(() => {
      role.value = roleStore.groupToRole.get(roomId)!
    })
  }

  async function loadRoom(roomId: number) {
    messages.value = msgStore.messagesList.get(roomId) || []
    roleList.value = groupStore.groupRoleList.get(roomId) || []
    role.value = roleStore.groupToRole.get(roomId) || undefined
  }

  return { curRoom, messages, role, roleList, usedAvatar, renderers, switchRoom }
})
