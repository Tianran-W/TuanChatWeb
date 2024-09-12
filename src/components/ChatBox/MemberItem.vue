<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { ElAvatar, ElPopover, ElText } from 'element-plus'

defineProps<{
  member: [string, string]
}>()
</script>

<template>
  <div class="message-item">
    <ElAvatar :size="50" shape="square" fit="cover" :icon="UserFilled" />
    <ElPopover
      ref="popover"
      title="用户"
      placement="right"
      trigger="contextmenu"
      :content="member[0]"
    >
      <template #reference>
        <ElButton>{{ member[1] !== '' ? member[1] : 'KP' }}</ElButton>
      </template>
    </ElPopover>
  </div>
</template>

<style scoped>
.message-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.el-text {
  word-break: break-all;
}
</style>
