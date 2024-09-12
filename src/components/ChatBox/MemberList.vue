<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import MemberItem from './MemberItem.vue'

defineProps<{
  members: [string, string][]
}>()
</script>

<template>
  <ElScrollbar>
    <div class="member-list">
      <MemberItem v-for="member in members" :key="member[0]" :member="member" />
    </div>
  </ElScrollbar>
</template>

<style scoped>
.member-list {
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}
</style>
