<script setup lang="ts">
import MessageItem from './MessageItem.vue'

defineProps<{
  msgs: string[]
}>()
</script>

<template>
  <div class="message-list">
    <MessageItem v-for="msg in msgs" :key="msg" :msg="msg" />
  </div>
</template>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
