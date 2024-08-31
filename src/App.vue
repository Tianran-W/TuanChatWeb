<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IconTitle from './components/IconTitle.vue'
</script>

<template>
  <header>
    <nav>
      <IconTitle title="团子" />
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/chat">聊天</RouterLink>
    </nav>
  </header>

  <RouterView class="content" />
</template>

<style scoped>
header {
  width: 10%;
}

nav {
  flex-direction: column;
  width: 100%;
  font-size: 25px;
  text-align: start;
  margin-top: 2rem;
  display: flex;
  justify-content: start;
  align-items: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
