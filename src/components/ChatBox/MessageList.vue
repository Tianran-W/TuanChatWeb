<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import MessageItem from './MessageItem.vue'
import { ref, nextTick, watch } from 'vue'
import type { MsgObject } from '@/services/types'
import { useGroupStore, useMsgStore } from '@/stores'

const groupStore = useGroupStore()
const msgStore = useMsgStore()
const isScrollTop = ref(true)
defineProps<{
  msgs: MsgObject[]
}>()

watch(
  () => groupStore.currentGroup,
  () => {
    nextTick(() => {
      if (innerRef.value!.clientHeight > 200) {
        scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
      }
    })
  }
)

const onScroll = (scroll: { scrollLeft: number; scrollTop: number }) => {
  isScrollTop.value = scroll.scrollTop === 0
}

const onWheel = (e: WheelEvent) => {
  if (e.deltaY < 0 && isScrollTop.value) {
    msgStore.fetchMsg(groupStore.currentGroup)
  }
}

const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
</script>

<template>
  <ElScrollbar ref="scrollbarRef" @scroll="onScroll">
    <div class="message-list" ref="innerRef" @wheel="onWheel">
      <MessageItem v-for="msg in msgs" :key="msg.syncId" :msg="msg" />
    </div>
  </ElScrollbar>
</template>

<style scoped>
.message-list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
