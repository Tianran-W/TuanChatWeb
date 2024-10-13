<script setup lang="ts">
import { ElMenuItem, ElAvatar } from 'element-plus'
import { useRoleStore } from '@/stores'
import router from '@/router'

const props = defineProps<{
  roleId: number
}>()

const roleStore = useRoleStore()
const roleInfo = roleStore.userRoleList.get(props.roleId)
const pathToRoleCard = `/role/${roleInfo?.roleId}`
</script>

<template>
  <ElMenuItem index="4-1" @click="router.push(pathToRoleCard)">
    <ElAvatar :src="roleInfo?.avatar" shape="square" fit="cover" />
    {{ roleInfo?.roleName }}
  </ElMenuItem>
</template>

<style scoped>
.el-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
