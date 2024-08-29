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
    <input v-model="message" />
    <button @click="sendMessage">Send</button>
  </div>
</template>
