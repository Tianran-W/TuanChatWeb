<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { MemberList, MessageList, InputBox } from '@/components'
import { ElContainer, ElMain, ElScrollbar, ElAside } from 'element-plus'
import { useMsgStore } from '@/stores'
import { useRoute } from 'vue-router'

const msgStore = useMsgStore()
const route = useRoute()

onMounted(() => {
  msgStore.switchRoom(Number(route.params.id))
})

watch(
  () => route.params.id,
  (newId) => {
    msgStore.switchRoom(Number(newId))
  }
)

const members = ref<[string, string][]>([
  ['jxc', 'alice'],
  ['wtr', 'terra'],
  ['kp', '']
])
const prevUrl = ``
</script>

<template>
  <ElContainer>
    <ElMain class="group">
      <iframe class="gamePreview" :src="prevUrl"></iframe>
      <MessageList :msgs="msgStore.curMessages" />
      <InputBox />
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
  grid-template-rows: 1fr 1fr 50px;
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
