<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { ElAvatar, ElText } from 'element-plus'
import type { MsgObject, TextBody } from '@/services/types'
import { computed } from 'vue'

const props = defineProps<{
  msg: MsgObject
}>()

const msg = computed(() => props.msg)
</script>

<template>
  <div class="message-item">
    <ElAvatar :size="80" shape="square" fit="cover" :icon="UserFilled" />
    <ElText size="large">{{ (msg.body as TextBody).content }}</ElText>
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
