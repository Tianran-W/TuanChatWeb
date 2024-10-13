import { ref } from 'vue'
import { defineStore } from 'pinia'
import { tuanApis } from '@/services'
import type { RoomGroup, UserRole } from '@/services'
import { Renderer } from '@/utils/renderer'

export const useGroupStore = defineStore('group', () => {
  const groupList = ref<Map<number, RoomGroup>>(new Map<number, RoomGroup>())
  const subGroupMap = ref(new Map<number, number[]>())
  const groupRoleList = ref(new Map<number, UserRole[]>())
  const renderers = new Map<number, Renderer>()

  async function createRenderer(roomId: number) {
    const renderer = new Renderer(roomId)
    await renderer.initRender()
    renderers.set(roomId, renderer)
  }

  async function getGroupList() {
    const data = (await tuanApis.getUserGroups()).data.data
    if (data === undefined) {
      throw new Error('Group list not found')
    }
    initGroupMap(data)
  }

  function initGroupMap(groupInfolist: RoomGroup[]) {
    if (!groupInfolist || groupInfolist.length === 0) {
      return
    }

    groupInfolist.forEach((group) => {
      if (group.roomId !== undefined) {
        groupList.value.set(group.roomId, group)
        if (group.parentGroupId === 0) {
          subGroupMap.value.set(group.roomId, [])
        }
      }
    })

    groupInfolist.forEach((group) => {
      if (group.parentGroupId && group.parentGroupId !== 0) {
        const parentGroup = groupList.value.get(group.parentGroupId)
        if (parentGroup === undefined || parentGroup.roomId === undefined) {
          throw new Error('Parent group not found')
        }
        const children = subGroupMap.value.get(parentGroup.roomId)
        if (children !== undefined && group.roomId !== undefined) {
          children.push(group.roomId)
          subGroupMap.value.set(parentGroup.roomId, children)
        }
      }
    })
  }

  async function fetchRoles(groupId: number) {
    const data = (await tuanApis.groupRole({ roomId: groupId })).data.data
    if (data === undefined) {
      throw new Error('Group roles not found')
    }
    groupRoleList.value.set(groupId, data)
  }

  return {
    renderers,
    groupList,
    subGroupMap,
    groupRoleList,
    getGroupList,
    fetchRoles,
    createRenderer
  }
})
