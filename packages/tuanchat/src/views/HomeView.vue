<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore, useGroupStore, useRoleStore } from '@/stores'
import { computed } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const groupStore = useGroupStore()
const roleStore = useRoleStore()

const first_groupid = computed(() => groupStore.groupList.keys().next().value)
const first_roleid = computed(() => roleStore.userRoleList.keys().next().value)
</script>

<template>
  <div class="home">
    <h1>Home</h1>
    <ElButton v-if="!userStore.isSign" @click="router.push('/login')">Click to login</ElButton>
    <span v-else class="toolbox">
      <ElButton @click="router.push('/group/' + first_groupid)">Group</ElButton>
      <ElButton @click="router.push('/role/' + first_roleid)">Role</ElButton>
    </span>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.toolbox {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
