<script setup lang="ts">
import { ElButton, ElSelect, ElOption, ElInput, ElAvatar } from 'element-plus'
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { useMsgStore, useRoomStore, useRoleStore } from '@/stores'

const message = ref('')
const msgStore = useMsgStore()
const roomStore = useRoomStore()
const roleStore = useRoleStore()
const usedAvatar = ref<number>(1)

const sendMessage = () => {
  if (message.value.trim() === '') return
  msgStore.sendMsg(
    message.value,
    roomStore.curRoom?.roomId!,
    roomStore.role?.roleId!,
    usedAvatar.value
  )
  message.value = ''
}
</script>

<template>
  <div class="input-box">
    <ElSelect v-model="usedAvatar" placeholder="Select">
      <ElOption
        v-for="item in roleStore.roleToImages.get(roomStore.role?.roleId!)"
        :key="item"
        :value="item"
      >
        <ElAvatar
          :size="30"
          shape="square"
          fit="cover"
          :src="roleStore.imageUrls.get(item)?.avatarUrl"
        />
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
