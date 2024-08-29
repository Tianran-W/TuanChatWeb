<script setup lang="ts">
import { ref } from 'vue'
import InputBox from '../components/ChatBox/InputBox.vue'
import MessageList from '../components/ChatBox/MessageList.vue'

const messages = ref<string[]>(['Hello', 'Hi', 'How are you?'])
</script>

<template>
  <div class="chat">
    <div>
      <MessageList v-model:msgs="messages" />
    </div>
    <div>
      <InputBox v-model:msgs="messages" />
    </div>
  </div>
</template>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
