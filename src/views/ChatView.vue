<script setup lang="ts">
import { ref } from 'vue'
import InputBox from '../components/ChatBox/InputBox.vue'
import MessageList from '../components/ChatBox/MessageList.vue'

const messages = ref<string[]>(['Hello', 'Hi', 'How are you?'])
</script>

<template>
  <div class="chat">
    <MessageList v-model:msgs="messages" />
    <InputBox v-model:msgs="messages" />
  </div>
</template>

<style scoped>
.chat {
  display: grid;
  grid-template-rows: 10fr 1fr;
}

.chat .message-list {
  padding: 10px;
}
</style>
