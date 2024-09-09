<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElHeader, ElIcon } from 'element-plus'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <ElHeader style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <ElDropdown>
        <ElIcon style="margin-right: 8px; margin-top: 1px">
          <Operation />
        </ElIcon>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>
              <RouterLink v-if="!userStore.isSign" to="/login">Login</RouterLink>
              <span v-else>Logout</span>
            </ElDropdownItem>
            <ElDropdownItem>Settings</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
      <span>{{ userStore.userInfo.username }}</span>
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
