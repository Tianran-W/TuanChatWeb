<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

// Element Plus 国际化配置
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <nav>
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50px" height="50px" />
      </RouterLink>
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/chat">聊天</RouterLink>
    </nav>
    <RouterView class="content" />
  </ElConfigProvider>
</template>

<style scoped>
nav {
  font-size: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  display: inline-block;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

.content {
  background-color: #1e1e1e;
}
</style>
