<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores'

const route = useRoute()
const roleStore = useRoleStore()

const role = roleStore.roleList.get(Number(route.params.id))
</script>

<template>
  <h1>{{ role?.roleName }}</h1>
  <p>{{ role?.description }}</p>
</template>

<style scoped></style>
