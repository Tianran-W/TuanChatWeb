import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { tuanApis } from '@/services'
import type { UserRole, RoleAvatar } from '@/services'

export const useRoleStore = defineStore('role', () => {
  const roleList = ref<UserRole[]>([])
  const roleToAvatars = reactive(new Map<number, number[]>())
  const avatarToUrl = reactive(new Map<number, string>())
  const groupToRole = reactive(new Map<number, UserRole>())

  function fetchRoleAvatars(roleId: number) {
    return new Promise((resolve, reject) => {
      tuanApis.getRoleAvatars({ roleId: roleId }).then((res) => {
        if (res.data.data === undefined) {
          reject(new Error('Role avatars not found'))
          return
        }
        const data = res.data.data
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
        resolve('Role avatars loaded')
      })
    })
  }

  function fetchAvatar(avatarId: number) {
    return new Promise((resolve, reject) => {
      tuanApis.getRoleAvatar({ avatarId: avatarId }).then((res) => {
        if (res.data.data === undefined) {
          reject(new Error('Role avatars not found'))
          return
        }
        const data = res.data.data
        avatarToUrl.set(avatarId, data.avatarUrl!)
        resolve('Role avatars loaded')
      })
    })
  }

  function fetchRole(groupId: number) {
    return new Promise((resolve) => {
      groupToRole.set(groupId, roleList.value[0]!)
      resolve('Role loaded')
    })
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
