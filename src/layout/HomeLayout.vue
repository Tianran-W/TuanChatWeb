<script setup lang="ts">
import { RouterView } from 'vue-router'

import { ElContainer, ElMain } from 'element-plus'

import PrimarySider from '../components/Sider/PrimarySider.vue'
import PrimaryHeader from '../components/Header/PrimaryHeader.vue'
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
