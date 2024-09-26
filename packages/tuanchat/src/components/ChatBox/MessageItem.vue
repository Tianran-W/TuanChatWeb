<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { ElAvatar, ElText } from 'element-plus'
import type { MsgType, TextBody } from '@/stores/types'
import { MsgEnum } from '@/enums'

const props = defineProps<{
  msg: MsgType
}>()

const msgType: MsgEnum = props.msg.messageType
</script>

<template>
  <div class="message-item">
    <ElAvatar :size="80" shape="square" fit="cover" :icon="UserFilled" />
    <ElText v-if="msgType === MsgEnum.TEXT" size="large">{{
      (msg.body as TextBody).content
    }}</ElText>
    <h1 v-else>Unsupported message type</h1>
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
