<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus'
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { useMsgStore, useGroupStore } from '@/stores'

const message = ref('')
const msgStore = useMsgStore()
const groupStore = useGroupStore()

const sendMessage = () => {
  if (message.value.trim() === '') return
  msgStore.sendMsg(message.value, groupStore.currentGroup)
  message.value = ''
}
</script>

<template>
  <div class="input-box">
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
}
</style>
