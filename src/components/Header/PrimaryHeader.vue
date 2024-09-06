<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElHeader, ElIcon } from 'element-plus'
</script>

<template>
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
</template>

<style scoped>
.el-header {
  position: relative;
  background: #3375b9;
}

.el-menu {
  border-right: none;
  background-color: #66b1ff;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
