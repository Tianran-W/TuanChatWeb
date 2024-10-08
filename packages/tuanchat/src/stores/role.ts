import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tuanApis } from '@/services'
import type { UserRole, RoleAvatar, RoleAbilityTable } from '@/services'

export const useRoleStore = defineStore('role', () => {
  const userRoleList = ref(new Map<number, UserRole>())
  const roleAbility = ref(new Map<number, RoleAbilityTable>())
  const roleToImages = ref(new Map<number, number[]>())
  const imageUrls = ref(new Map<number, { spriteUrl: string; avatarUrl: string }>())
  const groupToRole = ref(new Map<number, UserRole>())

  async function fetchRoleAvatars(roleId: number) {
    const data = (await tuanApis.getRoleAvatars({ roleId: roleId })).data.data
    if (data === undefined) {
      throw new Error('Role avatars not found')
    }
    data.forEach((avatar: RoleAvatar) => {
      if (avatar.avatarId !== undefined) {
        imageUrls.value.set(avatar.avatarId, {
          spriteUrl: avatar.spriteUrl!,
          avatarUrl: avatar.avatarUrl!
        })
      }
    })
    roleToImages.value.set(
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
    imageUrls.value.set(avatarId, {
      spriteUrl: data.spriteUrl!,
      avatarUrl: data.avatarUrl!
    })
  }

  async function fetchRole(groupId: number) {
    groupToRole.value.set(groupId, userRoleList.value.values().next().value!)
  }

  async function addRole() {
    const newRole = (await tuanApis.createRole()).data.data
    if (newRole === undefined) {
      throw new Error('Create role failed')
    }
    userRoleList.value.set(newRole.roleId!, newRole)
    tuanApis.getRoleAbility({ roleId: newRole.roleId! }).then((res) => {
      if (res.data.data === undefined) {
        throw new Error('Role ability not found')
      }
      roleAbility.value.set(newRole.roleId!, res.data.data)
    })
  }

  return {
    userRoleList,
    roleAbility,
    roleToImages,
    imageUrls,
    groupToRole,
    addRole,
    fetchRole,
    fetchRoleAvatars,
    fetchAvatar
  }
})
