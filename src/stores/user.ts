import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/services/types'
import apis from '@/services/apis'

export const useUserStore = defineStore('user', () => {
  const isSign = ref(false)
  const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  const userToken = ref('')

  function login(uid: number) {
    return new Promise((resolve, reject) => {
      apis.login({ userId: Number(uid), password: '123456' }).then((data) => {
        if (data !== undefined) {
          isSign.value = true
          userInfo.value.userId = uid
          userToken.value = data
          localStorage.setItem('token', data)
          setUserInfo(uid)
            .then(() => {
              resolve(true)
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          reject(new Error('Login failed'))
        }
      })
    })
  }

  function logout() {
    isSign.value = false
    userInfo.value.userId = 0
    userInfo.value.username = ''
    userInfo.value.avatar = ''
    userToken.value = ''
    localStorage.removeItem('token')
  }

  function setUserInfo(uid: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apis.getUserInfo({ userId: uid }).then((data) => {
        if (data !== undefined) {
          userInfo.value.userId = data.userId
          userInfo.value.username = data.username
          userInfo.value.avatar = data.avatar
          resolve()
        } else {
          logout()
          reject(new Error('User info not found'))
        }
      })
    })
  }

  return { userInfo, isSign, userToken, login }
})
