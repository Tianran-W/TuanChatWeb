<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { ElAvatar, ElText } from 'element-plus'

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="message-item">
    <ElAvatar :size="80" shape="square" fit="cover" :icon="UserFilled" />
    <ElText size="large">{{ msg }}</ElText>
  </div>
</template>

<style scoped>
.message-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px;
}

.el-text {
  word-break: break-all;
}
</style>
