<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Coordinate } from '@element-plus/icons-vue'
import { ElAside, ElIcon, ElMenu, ElMenuItem, ElScrollbar } from 'element-plus'
import RoomList from './RoomList.vue'
</script>

<template>
  <ElAside width="200px">
    <ElScrollbar>
      <ElMenu :collapse="false">
        <ElMenuItem index="1">
          <ElIcon><Coordinate /></ElIcon><RouterLink to="/">Home</RouterLink>
        </ElMenuItem>

        <RoomList />
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
