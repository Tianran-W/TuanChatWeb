import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useMsgStore } from './message'
import { useGroupStore } from './group'
import { useRoleStore } from './role'
import type { Message, UserRole } from '@/services'

export const useRoomStore = defineStore('room', () => {
  const msgStore = useMsgStore()
  const groupStore = useGroupStore()
  const roleStore = useRoleStore()
  const cachedRoomList = reactive(new Map<number, boolean>()) // true为群，false为私聊，有key代表在缓存中
  const curRoomId = ref<number>(0)
  const role = ref<UserRole>()
  const messages = ref<Message[]>([])
  const roleList = ref<UserRole[]>([])
  const usedAvatar = ref<number>(0)

  function switchRoom(roomId: number) {
    curRoomId.value = roomId
    if (!cachedRoomList.has(roomId)) {
      initRoom(roomId)
      //TODO：兼容私聊信息
      cachedRoomList.set(roomId, true)
    } else {
      loadRoom(roomId)
    }
  }

  function initRoom(roomId: number) {
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

  function loadRoom(roomId: number) {
    messages.value = msgStore.messagesList.get(roomId) || []
    roleList.value = groupStore.groupRoleList.get(roomId) || []
    role.value = roleStore.groupToRole.get(roomId) || undefined
  }

  return { curRoomId, messages, role, roleList, usedAvatar, switchRoom }
})
