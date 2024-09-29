import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from './types'
import { tuanApis } from '@/services'
import { useGroupStore } from './group'
import { useRoleStore } from './role'
import wsIns from '@/utils/websocket/websocket'

export const useUserStore = defineStore('user', () => {
  const isSign = ref(false)
  const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  const groupStore = useGroupStore()
  const roleStore = useRoleStore()

  async function login(uid: string) {
    const res_data = (await tuanApis.login({ userId: uid, password: '123456' })).data
    if (res_data.data === undefined) {
      throw new Error('Login failed')
    }
    isSign.value = true
    localStorage.setItem('token', res_data.data)
    wsIns.initConnect()
    await getUserInfo(uid)
  }

  function logout() {
    isSign.value = false
    userInfo.value.userId = 0
    userInfo.value.username = ''
    userInfo.value.avatar = ''
    roleStore.roleList = []
    localStorage.removeItem('token')
  }

  async function getUserInfo(uid: string) {
    const res_data = (await tuanApis.getUserInfo({ userId: Number(uid) })).data
    if (res_data.data === undefined) {
      logout()
      throw new Error('Group list not found')
    }
    userInfo.value.userId = res_data.data.userId!
    userInfo.value.username = res_data.data.username!
    userInfo.value.avatar = res_data.data.avatar!
    roleStore.roleList = res_data.data.roles!
    await groupStore.getGroupList()
  }

  return { userInfo, isSign, login, logout }
})
