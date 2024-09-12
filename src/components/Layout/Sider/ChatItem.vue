<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ElIcon, ElMenuItem } from 'element-plus'
import { More } from '@element-plus/icons-vue'
</script>

<template>
  <ElMenuItem>
    <RouterLink to="/group">
      <ElIcon><More /></ElIcon>Chat
    </RouterLink>
  </ElMenuItem>
</template>

<style scoped></style>
