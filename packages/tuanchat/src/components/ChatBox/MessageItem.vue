<script setup lang="ts">
import { ElAvatar, ElButton, ElText } from 'element-plus'
import { MsgEnum } from '@/enums'
import { useRoleStore } from '@/stores/role'
import { useRoomStore } from '@/stores'
import type { TextBody } from '@/stores/types'
import type { Message } from '@/services'
import { computed } from 'vue'

const props = defineProps<{
  msg: Message
}>()

const roleStore = useRoleStore()
const roomStore = useRoomStore()
const msgType: MsgEnum = props.msg.messageType!
const role = computed(() => {
  return roomStore.roleList.find((role) => role.roleId === props.msg.roleId)
})

const handleAddToRenderer = () => {
  roomStore.addDialog(role.value!, props.msg.avatarId!, (props.msg.body as TextBody).content)
}
</script>

<template>
  <div class="message-item">
    <ElAvatar
      :size="80"
      shape="square"
      fit="cover"
      :src="roleStore.imageUrls.get(props.msg.avatarId!)"
    />
    <div class="message-content">
      <div class="message-top">
        <ElText size="small">{{ role?.roleName }}</ElText>
        <ElButton @click="handleAddToRenderer">加入对话</ElButton>
      </div>
      <ElText v-if="msgType === MsgEnum.TEXT" size="large">{{
        (msg.body as TextBody).content
      }}</ElText>
      <h1 v-else>Unsupported message type</h1>
    </div>
  </div>
</template>

<style scoped>
.message-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px;
}

.message-content {
  display: grid;
  grid-template-rows: 10px 1fr;
}

.message-top {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
}

.el-text {
  word-break: break-all;
}
</style>
