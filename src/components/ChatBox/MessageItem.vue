<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="message-item">
    <div class="message">{{ msg }}</div>
  </div>
</template>

<style scoped>
.message-item {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}
</style>
