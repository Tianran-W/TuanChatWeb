<script setup lang="ts">
import { ElButton } from 'element-plus'
import { saveImageFromUrl } from '@/utils/renderer'

const testFunc = () => {
  saveImageFromUrl(
    'https://bjh-pixel.cdn.bcebos.com/user_personal_pixel/fa48e8bc446101d3514541652ea65e82.jpg',
    'Test',
    'google-logo.png'
  )
}
</script>

<template>
  <div class="home">
    <ElButton type="primary" @click="testFunc"> Primary </ElButton>
  </div>
</template>

<style scoped></style>
