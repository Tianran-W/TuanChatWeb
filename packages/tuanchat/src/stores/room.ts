import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMsgStore } from './message'
import { useGroupStore } from './group'
import { useRoleStore } from './role'
import { editScene, createPreview } from '@/utils/renderer'
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
  const textForRenderer = ref<string>('intro:你好|欢迎来到 WebGAL 的世界;')

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
    await createPreview(roomId)
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

  function addDialog(role: UserRole, avatarId: number, text: string) {
    addLineToRenderer(`changeFigure:role_${role.roleId}_avatar_${avatarId}.png -left -next;`)
    addLineToRenderer(`${role.roleName}: ${text}`)
  }

  async function addLineToRenderer(line: string) {
    textForRenderer.value = `${textForRenderer.value}\n${line}`
    editScene('Test', 'start', textForRenderer.value)
  }

  return { curRoom, messages, role, roleList, usedAvatar, switchRoom, addDialog }
})
