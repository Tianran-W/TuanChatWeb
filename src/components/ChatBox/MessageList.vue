<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import MessageItem from './MessageItem.vue'

defineProps<{
  msgs: string[]
}>()
</script>

<template>
  <ElScrollbar>
    <div class="message-list">
      <MessageItem v-for="msg in msgs" :key="msg" :msg="msg" />
    </div>
  </ElScrollbar>
</template>

<style scoped>
.message-list {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
