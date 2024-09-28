<script setup lang="ts">
import { ElAvatar, ElText } from 'element-plus'
import { MsgEnum } from '@/enums'
import { useRoleStore } from '@/stores/role'
import type { TextBody } from '@/stores/types'
import type { Message } from '@/services'

const props = defineProps<{
  msg: Message
}>()

const roleStore = useRoleStore()
const msgType: MsgEnum = props.msg.messageType!
</script>

<template>
  <div class="message-item">
    <ElAvatar
      :size="80"
      shape="square"
      fit="cover"
      :src="roleStore.avatarToUrl.get(props.msg.avatarId!)"
    />
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
