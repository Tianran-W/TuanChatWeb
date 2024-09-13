<script setup lang="ts">
import { ElMenuItemGroup, ElMenuItem, ElAvatar } from 'element-plus'
import { computed } from 'vue'

const props = defineProps<{
  groupInfo: {
    roomId: number
    name: string
    avatar: string
    description: string
    deleteStatus: number
    createTime: string
    updateTime: string
    parentGroupId: number
  }
}>()

const pathToGroup = computed(() => `/group/${props.groupInfo.roomId}`)
</script>

<template>
  <ElMenuItemGroup index="3-1">
    <template #title>{{ groupInfo.name }}</template>
    <ElMenuItem>
      <RouterLink :to="pathToGroup">
        <ElAvatar :src="groupInfo.avatar" style="" fit="cover" />
        {{ groupInfo.name }}
      </RouterLink>
    </ElMenuItem>
  </ElMenuItemGroup>
</template>

<style scoped></style>
