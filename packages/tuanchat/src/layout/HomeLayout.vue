<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ElContainer, ElMain } from 'element-plus'

import { PrimarySider, PrimaryHeader } from '../components'
</script>

<template>
  <ElContainer class="main-layout">
    <PrimarySider />
    <ElContainer direction="vertical">
      <PrimaryHeader />
      <ElMain>
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.main-layout {
  height: 100vh;
}

.main-layout .el-main {
  padding: 0;
  background-color: #424243;
}
</style>
