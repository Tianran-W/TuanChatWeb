<script setup lang="ts">
import { ElButton } from 'element-plus'

const check = () => {}
</script>

<template>
  <div class="home">
    <h1>Home</h1>
    <ElButton @click="check">For dev test</ElButton>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
