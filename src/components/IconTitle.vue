<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="greetings">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" height="100" />
    <h1 class="purple">{{ title }}</h1>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.greetings h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}
</style>
