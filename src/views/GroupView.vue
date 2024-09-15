<script setup lang="ts">
import { ref } from 'vue'
import { MemberList, MessageList, InputBox } from '@/components'
import { ElContainer, ElMain, ElScrollbar, ElAside } from 'element-plus'
import { useMsgStore } from '@/stores'

const msgStore = useMsgStore()

const messages = msgStore.messages
const members = ref<[string, string][]>([
  ['jxc', 'alice'],
  ['wtr', 'terra'],
  ['kp', '']
])
</script>

<template>
  <ElContainer>
    <ElMain class="group">
      <MessageList v-model:msgs="messages" />
      <InputBox v-model:msgs="messages" />
    </ElMain>
    <ElAside>
      <ElScrollbar>
        <MemberList v-model:members="members" />
      </ElScrollbar>
    </ElAside>
  </ElContainer>
</template>

<style scoped>
.group {
  display: grid;
  grid-template-rows: 1fr 50px;
  width: 100%;
  height: 100%;
  padding: 0;
}

.group .message-list {
  padding: 10px;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #a5c7e4;
  width: 20%;
  height: 100%;
  border-left: 2px solid #4072e7;
}
</style>
