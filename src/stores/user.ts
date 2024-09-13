import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfoType, GroupListResp } from '@/services/types'
import apis from '@/services/apis'

export const useUserStore = defineStore('user', () => {
  // const isSign = ref(false)
  // const userInfo = ref<UserInfoType>({ userId: 0, username: '', avatar: '', roleIds: [] })
  // const userToken = ref('')
  // const groupList = ref<GroupListResp>([])

  const isSign = ref(true)
  const userInfo = ref<UserInfoType>({ userId: 1, username: 'jxc', avatar: '', roleIds: [] })
  const userToken = ref('1')
  const groupList = ref<GroupListResp>([
    {
      roomId: 1,
      name: 'kpkp',
      avatar: '',
      description: '123',
      deleteStatus: 0,
      createTime: '0',
      updateTime: '0',
      parentGroupId: 1
    }
  ])

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
    userToken.value = ''
    localStorage.removeItem('token')
  }

  function setUserInfo(uid: number) {
    return new Promise((resolve, reject) => {
      apis.getUserInfo({ userId: uid }).then((data) => {
        if (data !== undefined) {
          userInfo.value.userId = data.userId
          userInfo.value.username = data.username
          userInfo.value.avatar = data.avatar
          getGroupList()
            .then(() => {
              resolve('User info loaded')
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          logout()
          reject(new Error('User info not found'))
        }
      })
    })
  }

  function getGroupList() {
    return new Promise((resolve, reject) => {
      apis.getGroupList().then((data) => {
        if (data !== undefined) {
          groupList.value = data
          resolve('Group list loaded')
        } else {
          reject(new Error('Group list not found'))
        }
      })
    })
  }

  return { userInfo, isSign, groupList, login, logout }
})
