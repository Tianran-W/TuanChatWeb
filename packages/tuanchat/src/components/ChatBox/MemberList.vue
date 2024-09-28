<script setup lang="ts">
import MemberItem from './MemberItem.vue'
import { ElScrollbar } from 'element-plus'
import type { UserRole } from '@/services'

defineProps<{
  members: UserRole[]
}>()
</script>

<template>
  <ElScrollbar>
    <div class="member-list">
      <MemberItem v-for="member in members" :key="member.roleId" :member="member" />
    </div>
  </ElScrollbar>
</template>

<style scoped>
.member-list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
