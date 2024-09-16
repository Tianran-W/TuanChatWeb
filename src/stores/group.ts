import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { GroupInfoType } from './types'
import apis from '@/services/apis'

export const useGroupStore = defineStore('group', () => {
  const groupList = reactive<Map<number, GroupInfoType>>(new Map<number, GroupInfoType>())
  const subGroupMap = reactive(new Map<number, number[]>())
  const currentGroup = ref<number>(0)

  function getGroupList() {
    return new Promise((resolve, reject) => {
      apis.getGroupList().then((data) => {
        if (data !== undefined) {
          initGroupMap(data)
          resolve('Group list loaded')
        } else {
          reject(new Error('Group list not found'))
        }
      })
    })
  }

  function initGroupMap(grouplist: GroupInfoType[]) {
    grouplist.forEach((group) => {
      groupList.set(group.roomId, group)
      if (group.parentGroupId === 0) {
        subGroupMap.set(group.roomId, [])
      }
    })

    grouplist.forEach((group) => {
      if (group.parentGroupId !== 0) {
        const parentGroup = groupList.get(group.parentGroupId)
        if (parentGroup === undefined) {
          throw new Error('Parent group not found')
        }
        const children = subGroupMap.get(parentGroup.roomId)
        if (children !== undefined) {
          children.push(group.roomId)
          subGroupMap.set(parentGroup.roomId, children)
        }
      }
    })
  }

  return { currentGroup, groupList, subGroupMap, getGroupList }
})
