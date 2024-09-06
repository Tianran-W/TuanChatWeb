<script setup lang="ts">
import { RouterView } from 'vue-router'

// Element Plus 组件导入
import { Message, Setting, Coordinate } from '@element-plus/icons-vue'
import {
  ElAside,
  ElContainer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElHeader,
  ElIcon,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElScrollbar,
  ElSubMenu
} from 'element-plus'
</script>

<template>
  <ElContainer class="main-layout">
    <ElAside width="200px">
      <ElScrollbar>
        <ElMenu>
          <ElMenuItem index="1-1">
            <el-icon><Coordinate /></el-icon>Option 1
          </ElMenuItem>

          <ElSubMenu index="1">
            <template #title>
              <ElIcon><Message /></ElIcon>
            </template>
            <ElMenuItemGroup>
              <template #title>Server</template>
              <ElMenuItem index="1-1">Option 1</ElMenuItem>
            </ElMenuItemGroup>
          </ElSubMenu>
        </ElMenu>
      </ElScrollbar>
    </ElAside>

    <ElContainer>
      <ElHeader style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <ElDropdown>
            <ElIcon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </ElIcon>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>View</ElDropdownItem>
                <ElDropdownItem>Add</ElDropdownItem>
                <ElDropdownItem>Delete</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
          <span>Tom</span>
        </div>
      </ElHeader>

      <ElMain><RouterView /></ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.main-layout {
  height: 100vh;
}

.main-layout .el-header {
  position: relative;
  background: #3375b9;
}

.main-layout .el-menu {
  border-right: none;
  background-color: #66b1ff;
}

.main-layout .el-main {
  padding: 0;
  background-color: #424243;
}

.main-layout .el-aside {
  background-color: #3375b9;
}

.main-layout .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
