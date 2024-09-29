import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { tuanApis } from '@/services'
import type { RoomGroup, UserRole } from '@/services'

export const useGroupStore = defineStore('group', () => {
  const groupList = reactive<Map<number, RoomGroup>>(new Map<number, RoomGroup>())
  const subGroupMap = reactive(new Map<number, number[]>())
  const groupRoleList = reactive(new Map<number, UserRole[]>())

  async function getGroupList() {
    const data = (await tuanApis.getUserGroups()).data.data
    if (data === undefined) {
      throw new Error('Group list not found')
    }
    initGroupMap(data)
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

  async function fetchRoles(groupId: number) {
    const data = (await tuanApis.groupRole({ roomId: groupId })).data.data
    if (data === undefined) {
      throw new Error('Group roles not found')
    }
    groupRoleList.set(groupId, data)
  }

  return { groupList, subGroupMap, groupRoleList, getGroupList, fetchRoles }
})
