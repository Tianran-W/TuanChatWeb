<script setup lang="ts">
import { ref } from 'vue'

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
    <input type="text" v-model="message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style scoped>
.input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.input-box input {
  flex: 1;
  padding: 5px;
  margin-right: 10px;
}
</style>
