<script setup lang="ts">
import { ElAvatar, ElMenuItem } from 'element-plus'
import { More, UserFilled } from '@element-plus/icons-vue'
</script>

<template>
  <ElMenuItem index="2-1">
    <ElAvatar :icon="UserFilled"><More /></ElAvatar>Chat
  </ElMenuItem>
</template>

<style scoped></style>
