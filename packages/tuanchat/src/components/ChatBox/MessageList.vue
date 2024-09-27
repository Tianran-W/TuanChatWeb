<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import MessageItem from './MessageItem.vue'
import { ref, nextTick, watch } from 'vue'
import { useGroupStore, useMsgStore } from '@/stores'
import type { Message } from '@/services/tuanchat/Api'

const groupStore = useGroupStore()
const msgStore = useMsgStore()
const scrollTop = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

defineProps<{
  msgs: Message[]
}>()

watch(
  () => [msgStore.curMessages.length, groupStore.currentGroup],
  (newval, oldval) => {
    nextTick(() => {
      if (
        oldval[1] === newval[1] &&
        newval[0] > oldval[0] &&
        innerRef.value!.clientHeight - scrollTop.value < 1000
      ) {
        scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
      }
      if (oldval[1] !== newval[1]) {
        scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
      }
    })
  }
)

const onScroll = (scroll: { scrollLeft: number; scrollTop: number }) => {
  scrollTop.value = scroll.scrollTop
}

const onWheel = (e: WheelEvent) => {
  if (e.deltaY < 0 && scrollTop.value === 0) {
    msgStore.fetchMsg(groupStore.currentGroup)
  }
}
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
