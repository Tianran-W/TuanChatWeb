import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { tuanApis } from '@/services'
import type { UserRole, RoleAvatar } from '@/services'

export const useRoleStore = defineStore('role', () => {
  const roleList = reactive(new Map<number, UserRole>())
  const roleToAvatars = reactive(new Map<number, number[]>())
  const avatarToUrl = reactive(new Map<number, string>())
  const groupToRole = reactive(new Map<number, UserRole>())

  async function fetchRoleAvatars(roleId: number) {
    const data = (await tuanApis.getRoleAvatars({ roleId: roleId })).data.data
    if (data === undefined) {
      throw new Error('Role avatars not found')
    }
    data.forEach((avatar: RoleAvatar) => {
      if (avatar.avatarId !== undefined) {
        avatarToUrl.set(avatar.avatarId, avatar.avatarUrl!)
      }
    })
    roleToAvatars.set(
      roleId,
      data
        .filter((avatar: RoleAvatar) => avatar.avatarId !== undefined)
        .map((avatar: RoleAvatar) => avatar.avatarId!)
    )
  }

  async function fetchAvatar(avatarId: number) {
    const data = (await tuanApis.getRoleAvatar({ avatarId: avatarId })).data.data
    if (data === undefined) {
      throw new Error('Role avatars not found')
    }
    avatarToUrl.set(avatarId, data.avatarUrl!)
  }

  async function fetchRole(groupId: number) {
    groupToRole.set(groupId, roleList.values().next().value)
  }

  return {
    roleList,
    roleToAvatars,
    avatarToUrl,
    groupToRole,
    fetchRole,
    fetchRoleAvatars,
    fetchAvatar
  }
})
