<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import MessageItem from './MessageItem.vue'
import { computed } from 'vue'

const props = defineProps<{
  msgs: string[]
}>()

const reversedMsgs = computed(() => props.msgs.slice().reverse())
</script>

<template>
  <ElScrollbar>
    <div class="message-list">
      <MessageItem v-for="msg in reversedMsgs" :key="msg" :msg="msg" />
    </div>
  </ElScrollbar>
</template>

<style scoped>
.message-list {
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}
</style>
