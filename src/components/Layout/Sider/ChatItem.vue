<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ElAvatar, ElMenuItem } from 'element-plus'
import { More, UserFilled } from '@element-plus/icons-vue'
</script>

<template>
  <ElMenuItem>
    <ElAvatar :icon="UserFilled"><More /></ElAvatar>Chat
  </ElMenuItem>
</template>

<style scoped></style>
