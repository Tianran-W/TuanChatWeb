<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue'
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElHeader,
  ElIcon,
  ElAvatar,
  ElText
} from 'element-plus'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <ElHeader style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <span class="user-preview" v-if="userStore.isSign">
        <ElAvatar shape="square" fit="cover" src="" />
        <ElText type="info">{{ userStore.userInfo.username }}</ElText>
      </span>
      <ElDropdown>
        <ElIcon style="margin-right: 8px; margin-top: 1px">
          <Operation />
        </ElIcon>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>
              <RouterLink v-if="!userStore.isSign" to="/login">Login</RouterLink>
              <RouterLink v-else @click="userStore.logout()" to="/login">Logout</RouterLink>
            </ElDropdownItem>
            <ElDropdownItem>
              <RouterLink to="/setting">Settings</RouterLink>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
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
  gap: 15px;
}

.user-preview {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  gap: 15px;
}
</style>
