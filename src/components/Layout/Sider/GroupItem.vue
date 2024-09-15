<script setup lang="ts">
import { ElMenuItemGroup, ElMenuItem, ElAvatar } from 'element-plus'
import { computed } from 'vue'
import { useGroupStore } from '@/stores'
import type { GroupInfoType } from '@/stores/types'

const props = defineProps<{
  groupId: number
  subGroupIds: number[]
}>()

const groupStore = useGroupStore()
const subGroupList = computed(() => groupStore.groupMap.get(props.groupId) || [])
const pathToGroup = computed(() => `/group/${props.groupId}`)
const groupInfo = computed(() => groupStore.groupList.get(props.groupId) || ({} as GroupInfoType))
</script>

<template>
  <ElMenuItemGroup index="3-1">
    <template #title>{{ groupInfo.name }}</template>
    <ElMenuItem index="3-1-1">
      <RouterLink :to="pathToGroup">
        <ElAvatar :src="groupInfo.avatar" style="" fit="cover" />
        {{ groupInfo.name }}
      </RouterLink>
    </ElMenuItem>
  </ElMenuItemGroup>
</template>

<style scoped></style>
