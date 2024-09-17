<script setup lang="ts">
import { ElMenuItemGroup, ElMenuItem, ElAvatar } from 'element-plus'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useGroupStore } from '@/stores'
import type { GroupInfoType } from '@/stores/types'

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
    <ElMenuItem index="3-1-1">
      <RouterLink :to="pathToGroup">
        <ElAvatar :src="groupInfo.avatar" shape="square" fit="cover" />
        {{ groupInfo.name }}
      </RouterLink>
    </ElMenuItem>
    <ElMenuItem
      v-for="(subGroupId, index) in props.subGroupIds"
      :key="index"
      :index="`3-1-${index + 2}`"
    >
      <RouterLink :to="`/group/${subGroupId}`">
        <ElAvatar :src="subGroupList[index].avatar" shape="square" fit="cover" />
        {{ subGroupList[index].name }}
      </RouterLink>
    </ElMenuItem>
  </ElMenuItemGroup>
</template>

<style scoped></style>
