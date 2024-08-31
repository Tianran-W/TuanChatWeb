<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps<{
  title: string
}>()
</script>

<template>
  <span>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="40px" height="40px" />
    <RouterLink to="/" class="title">{{ title }}</RouterLink>
  </span>
</template>

<style scoped>
span {
  display: inline-flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

.title {
  font-weight: 500;
  font-size: 25px;
  text-decoration: none;
  transition: 0.4s;
  padding: 1rem 0;
  color: #75409a;
}

.logo {
  margin-left: 0px;
}
</style>
