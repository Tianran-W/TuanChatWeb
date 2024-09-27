import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { RoomGroup } from '@/services/tuanchat/Api'
import { tuanApis } from '@/services'

export const useGroupStore = defineStore('group', () => {
  const groupList = reactive<Map<number, RoomGroup>>(new Map<number, RoomGroup>())
  const subGroupMap = reactive(new Map<number, number[]>())
  const currentGroup = ref<number>(0)

  function getGroupList() {
    return new Promise((resolve, reject) => {
      tuanApis.getUserGroups().then((res) => {
        if (res.data.data !== undefined) {
          initGroupMap(res.data.data)
          resolve('Group list loaded')
        } else {
          reject(new Error('Group list not found'))
        }
      })
    })
  }

  function initGroupMap(grouplist: RoomGroup[]) {
    grouplist.forEach((group) => {
      if (group.roomId !== undefined) {
        groupList.set(group.roomId, group)
        if (group.parentGroupId === 0) {
          subGroupMap.set(group.roomId, [])
        }
      }
    })

    grouplist.forEach((group) => {
      if (group.parentGroupId && group.parentGroupId !== 0) {
        const parentGroup = groupList.get(group.parentGroupId)
        if (parentGroup === undefined || parentGroup.roomId === undefined) {
          throw new Error('Parent group not found')
        }
        const children = subGroupMap.get(parentGroup.roomId)
        if (children !== undefined && group.roomId !== undefined) {
          children.push(group.roomId)
          subGroupMap.set(parentGroup.roomId, children)
        }
      }
    })
  }

  return { currentGroup, groupList, subGroupMap, getGroupList }
})
