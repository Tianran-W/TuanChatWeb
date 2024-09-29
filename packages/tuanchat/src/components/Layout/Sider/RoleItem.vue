<script setup lang="ts">
import { ElMenuItem, ElAvatar } from 'element-plus'
import { RouterLink } from 'vue-router'
import { useRoleStore } from '@/stores'

const props = defineProps<{
  roleId: number
}>()

const roleStore = useRoleStore()
const roleInfo = roleStore.roleList.get(props.roleId)
const pathToGroup = `/role/${roleInfo?.roleName}`
</script>

<template>
  <ElMenuItem index="4-1">
    <RouterLink :to="pathToGroup">
      <ElAvatar :src="roleInfo?.avatar" shape="square" fit="cover" />
      {{ roleInfo?.roleName }}
    </RouterLink>
  </ElMenuItem>
</template>

<style scoped></style>
