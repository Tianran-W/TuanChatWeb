import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/services/types'

export const useUserStore = defineStore('user', () => {
  const isSign = ref(false)
  const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  const userToken = ref('')

  function login(uid: number, token: string) {
    isSign.value = true
    userInfo.value.userId = uid
    userToken.value = token
    localStorage.setItem('token', token)
  }

  function logout() {
    isSign.value = false
    userInfo.value.userId = 0
    userToken.value = ''
    localStorage.removeItem('token')
  }

  return { userInfo, isSign, userToken, login, logout }
})
