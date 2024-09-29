import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from './types'
import { tuanApis } from '@/services'
import type { UserRole } from '@/services'
import { useGroupStore } from './group'
import { useRoleStore } from './role'
import wsIns from '@/utils/websocket/websocket'

export const useUserStore = defineStore('user', () => {
  const isSign = ref(false)
  const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  const groupStore = useGroupStore()
  const roleStore = useRoleStore()

  async function login(uid: string) {
    const data = (await tuanApis.login({ userId: uid, password: '123456' })).data.data
    if (data === undefined) {
      throw new Error('Login failed')
    }
    isSign.value = true
    localStorage.setItem('token', data)
    wsIns.initConnect()
    await getUserInfo(uid)
  }

  function logout() {
    isSign.value = false
    userInfo.value.userId = 0
    userInfo.value.username = ''
    userInfo.value.avatar = ''
    roleStore.roleList = reactive(new Map<number, UserRole>())
    localStorage.removeItem('token')
  }

  async function getUserInfo(uid: string) {
    const data = (await tuanApis.getUserInfo({ userId: Number(uid) })).data.data
    if (data === undefined) {
      logout()
      throw new Error('Group list not found')
    }
    userInfo.value.userId = data.userId!
    userInfo.value.username = data.username!
    userInfo.value.avatar = data.avatar!
    data.roles?.forEach((role) => {
      console.log(role)
      roleStore.roleList.set(role.roleId!, role)
    })
    await groupStore.getGroupList()
  }

  return { userInfo, isSign, login, logout }
})
