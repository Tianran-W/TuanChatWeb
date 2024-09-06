<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Message, Coordinate } from '@element-plus/icons-vue'
import {
  ElAside,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElScrollbar,
  ElSubMenu
} from 'element-plus'
</script>

<template>
  <ElAside width="200px">
    <ElScrollbar>
      <ElMenu :collapse="false">
        <ElMenuItem index="1-1">
          <el-icon><Coordinate /></el-icon><RouterLink to="/">Home</RouterLink>
        </ElMenuItem>

        <ElSubMenu index="1">
          <template #title>
            <ElIcon><Message /></ElIcon>
          </template>
          <ElMenuItemGroup>
            <template #title>Server</template>
            <ElMenuItem index="1-1">
              <RouterLink to="/chat">Chat</RouterLink>
            </ElMenuItem>
          </ElMenuItemGroup>
        </ElSubMenu>
      </ElMenu>
    </ElScrollbar>
  </ElAside>
</template>

<style scoped>
.el-menu {
  border-right: none;
  background-color: #66b1ff;
}

.el-aside {
  position: relative;
  background-color: #3375b9;
}
</style>
