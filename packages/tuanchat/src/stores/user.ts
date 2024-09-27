import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType } from './types'
import { tuanApis } from '@/services'
import { useGroupStore } from './group'
import wsIns from '@/utils/websocket/websocket'

export const useUserStore = defineStore('user', () => {
  const isSign = ref(false)
  const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  const groupStore = useGroupStore()

  function login(uid: string) {
    return new Promise((resolve, reject) => {
      tuanApis.login({ userId: uid, password: '123456' }).then((res) => {
        if (res.data.data !== undefined) {
          isSign.value = true
          localStorage.setItem('token', res.data.data)
          wsIns.initConnect()
          getUserInfo(uid)
            .then(() => {
              resolve('Login success')
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
    localStorage.removeItem('token')
  }

  function getUserInfo(uid: string) {
    return new Promise((resolve, reject) => {
      tuanApis.getUserInfo({ userId: Number(uid) }).then((res) => {
        if (res.data.data !== undefined) {
          userInfo.value.userId = res.data.data.userId || 0
          userInfo.value.username = res.data.data.username || ''
          userInfo.value.avatar = res.data.data.avatar || ''
          getUserDetail()
          resolve('User info loaded')
        } else {
          logout()
          reject(new Error('User info not found'))
        }
      })
    })
  }

  function getUserDetail() {
    groupStore.getGroupList().catch((err) => {
      throw new Error(err)
    })
  }

  return { userInfo, isSign, login, logout }
})
