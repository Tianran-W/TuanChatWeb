<script setup lang="ts">
import { ElButton, ElSelect, ElOption, ElInput, ElAvatar } from 'element-plus'
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { useMsgStore, useRoomStore, useRoleStore } from '@/stores'

const message = ref('')
const msgStore = useMsgStore()
const roomStore = useRoomStore()
const roleStore = useRoleStore()

const sendMessage = () => {
  console.log('send message')
  console.log(roomStore.curRoom)
  if (message.value.trim() === '') return
  console.log('send message', roomStore.usedAvatar)
  msgStore.sendMsg(
    message.value,
    roomStore.curRoom?.roomId!,
    roomStore.role?.roleId!,
    roomStore.usedAvatar === 0 ? 1 : roomStore.usedAvatar
  )
  message.value = ''
}
</script>

<template>
  <div class="input-box">
    <ElSelect v-model="roomStore.usedAvatar" placeholder="Select">
      <ElOption
        v-for="item in roleStore.roleToAvatars.get(roomStore.role?.roleId!)"
        :key="item"
        :value="item"
      >
        <ElAvatar :size="30" shape="square" fit="cover" :src="roleStore.avatarToUrl.get(item)" />
      </ElOption>
    </ElSelect>
    <ElInput v-model="message" placeholder="Please input" @keyup.enter="sendMessage">
      <template #append>
        <ElButton :icon="Promotion" @click="sendMessage" :disabled="message.trim() === ''" />
      </template>
    </ElInput>
  </div>
</template>

<style scoped>
.input-box {
  padding: 10px;
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
}
</style>
