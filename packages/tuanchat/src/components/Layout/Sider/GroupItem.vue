<script setup lang="ts">
import { ElMenuItemGroup, ElMenuItem, ElAvatar } from 'element-plus'
import { computed } from 'vue'
import { useGroupStore } from '@/stores'
import type { GroupInfoType } from '@/stores/types'
import router from '@/router'

const props = defineProps<{
  groupId: number
  subGroupIds: number[]
}>()

const groupStore = useGroupStore()
const subGroupList = computed(() => {
  return props.subGroupIds.map(
    (subGroupId) => groupStore.groupList.get(subGroupId) as GroupInfoType
  )
})
const pathToGroup = computed(() => `/group/${props.groupId}`)
const groupInfo = computed(() => groupStore.groupList.get(props.groupId) as GroupInfoType)
</script>

<template>
  <ElMenuItemGroup index="3-1">
    <template #title>{{ groupInfo.name }}</template>
    <ElMenuItem index="3-1-1" @click="router.push(pathToGroup)">
      <ElAvatar :src="groupInfo.avatar" shape="square" fit="cover" />
      {{ groupInfo.name }}
    </ElMenuItem>
    <ElMenuItem
      v-for="(subGroupId, index) in props.subGroupIds"
      :key="index"
      :index="`3-1-${index + 2}`"
      @click="router.push(`/group/${subGroupId}`)"
    >
      <ElAvatar :src="subGroupList[index].avatar" shape="square" fit="cover" />
      {{ subGroupList[index].name }}
    </ElMenuItem>
  </ElMenuItemGroup>
</template>

<style scoped>
.el-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
