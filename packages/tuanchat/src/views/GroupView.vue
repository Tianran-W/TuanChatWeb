<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { MemberList, MessageList, InputBox } from '@/components'
import { ElContainer, ElMain, ElAside } from 'element-plus'
import { useRoomStore } from '@/stores'
import { useRoute } from 'vue-router'

const roomStore = useRoomStore()
const route = useRoute()

onMounted(() => {
  roomStore.switchRoom(Number(route.params.id))
})

watch(
  () => route.params.id,
  (newId) => {
    roomStore.switchRoom(Number(newId))
  }
)

const gameName = 'Test'
const prevUrl = `${import.meta.env.VITE_TERRE_URL}/games/${gameName}`
</script>

<template>
  <ElContainer>
    <ElMain>
      <MessageList :msgs="roomStore.messages" />
      <InputBox />
    </ElMain>
    <ElAside class="sider">
      <iframe class="game-preview" :src="prevUrl" frameborder="0"></iframe>
      <MemberList v-model:members="roomStore.roleList" />
    </ElAside>
  </ElContainer>
</template>

<style scoped>
.game-preview {
  width: 100%;
  height: 100%;
}

.sider {
  display: grid;
  grid-template-rows: 1fr 2fr;
  width: 100%;
  height: 100%;
  padding: 0;
}

.el-main {
  display: grid;
  grid-template-rows: 1fr 50px;
  width: 100%;
  height: 100%;
  padding: 0;
}

.el-main .message-list {
  padding: 10px;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #a5c7e4;
  width: 32%;
  height: 100%;
  border-left: 2px solid #4072e7;
}
</style>
