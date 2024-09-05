<script setup lang="ts">
import { Menu as Message, Setting } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// Element Plus 国际化配置
import {
  ElAside,
  ElConfigProvider,
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
  ElSubMenu,
  ElTable,
  ElTableColumn
} from 'element-plus'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <ElContainer class="main-layout">
      <ElAside width="200px">
        <ElScrollbar>
          <ElMenu>
            <ElSubMenu index="1">
              <template #title>
                <ElIcon><message /></ElIcon>Navigator One
              </template>
              <ElMenuItemGroup>
                <template #title>Group 1</template>
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

        <ElMain>Main</ElMain>
      </ElContainer>
    </ElContainer>
  </ElConfigProvider>
</template>

<style scoped></style>
