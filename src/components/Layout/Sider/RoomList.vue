<script setup lang="ts">
import { ElIcon, ElMenuItem, ElSubMenu } from 'element-plus'
import { Message, More, List } from '@element-plus/icons-vue'
import ChatItem from './ChatItem.vue'
import GroupItem from './GroupItem.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <ElMenuItem v-if="!userStore.isSign" index="2">
    <RouterLink to="/login">
      <ElIcon><More /></ElIcon>More
    </RouterLink>
  </ElMenuItem>

  <span v-else>
    <ElSubMenu index="2">
      <template #title>
        <ElIcon><Message /></ElIcon>Chat
      </template>
      <ChatItem />
    </ElSubMenu>

    <ElSubMenu index="3">
      <template #title>
        <ElIcon><List /></ElIcon>Group
      </template>
      <GroupItem />
    </ElSubMenu>
  </span>
</template>

<style scoped></style>
