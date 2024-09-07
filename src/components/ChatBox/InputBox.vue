<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus'
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'

const messages = defineModel<string[]>('msgs', {
  required: true
})
const message = ref('')

const sendMessage = () => {
  if (message.value.trim() === '') return
  messages.value.push(message.value)
  message.value = ''
}
</script>

<template>
  <div class="input-box">
    <ElInput v-model="message" placeholder="Please input" @keyup.enter="sendMessage">
      <template #append>
        <ElButton :icon="Promotion" @click="sendMessage" />
      </template>
    </ElInput>
  </div>
</template>

<style scoped>
.input-box {
  padding: 10px;
}
</style>
