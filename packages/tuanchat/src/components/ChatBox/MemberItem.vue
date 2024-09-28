<script setup lang="ts">
import { ElAvatar, ElPopover, ElButton } from 'element-plus'
import type { UserRole } from '@/services'

defineProps<{
  member: UserRole
}>()
</script>

<template>
  <div class="message-item">
    <ElAvatar :size="50" shape="square" fit="cover" :src="member.avatar" />
    <ElPopover
      ref="popover"
      title="description"
      placement="right"
      trigger="contextmenu"
      :content="String(member.description!)"
    >
      <template #reference>
        <ElButton>{{ member.roleName }}</ElButton>
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
