<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="message-item">
    <img alt="Vue logo" src="@/assets/avatar.svg" width="100px" height="100px" />
    <p>{{ msg }}</p>
  </div>
</template>

<style scoped>
.message-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: start;
}

.message-item p {
  font-size: 20px;
  padding: 10px;
  width: 100%;
  height: 100%;
  word-break: break-all;
}
</style>
