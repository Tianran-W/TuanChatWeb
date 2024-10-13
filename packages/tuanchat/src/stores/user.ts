import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from './types'
import { tuanApis } from '@/services'
import { useGroupStore } from './group'
import { useRoleStore } from './role'
import { axiosIns } from '@/services'
import wsIns from '@/utils/websocket/websocket'

// TODO: cookies
export const useUserStore = defineStore('user', () => {
  const isSign = ref(false)
  const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  const groupStore = useGroupStore()
  const roleStore = useRoleStore()
  const token = ref('')

  async function login(uid: string) {
    const data = (await tuanApis.login({ userId: uid, password: '123456' })).data.data
    if (data === undefined) {
      throw new Error('Login failed')
    }
    isSign.value = true
    token.value = data
    axiosIns.defaults.headers.common['Authorization'] = `Bearer ${data}`
    wsIns.initConnect()
    await getUserInfo(uid)
  }

  function logout() {
    isSign.value = false
    userInfo.value.userId = 0
    userInfo.value.username = ''
    userInfo.value.avatar = ''
    roleStore.userRoleList.clear()
    roleStore.roleAbility.clear()
    groupStore.groupList.clear()
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
      roleStore.userRoleList.set(role.roleId!, role)
      console.log(role)
      tuanApis.getRoleAbility({ roleId: role.roleId! }).then((res) => {
        if (res.data.data === undefined) {
          throw new Error('Role ability not found')
        }
        roleStore.roleAbility.set(role.roleId!, res.data.data)
      })
    })
    await groupStore.getGroupList()
  }

  return { userInfo, isSign, token, login, logout }
})
