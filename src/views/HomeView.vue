<script setup lang="ts">
import { ElButton } from 'element-plus'
import apis from '@/services/apis'
</script>

<template>
  <div class="home">
    <ElButton type="primary" @click="apis.login({ userId: 1, password: '123456' })">
      Login
    </ElButton>
    <ElButton type="primary" @click="apis.getMessageList({ roomId: 1, pageSize: 5, cursor: 5 })">
      Primary
    </ElButton>
  </div>
</template>

<style scoped></style>
