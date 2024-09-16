<script setup lang="ts">
import MemberItem from './MemberItem.vue'

defineProps<{
  members: [string, string][]
}>()
</script>

<template>
  <div class="member-list">
    <MemberItem v-for="member in members" :key="member[0]" :member="member" />
  </div>
</template>

<style scoped>
.member-list {
  padding: 10px;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}
</style>
