import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const curRole = ref<string>('')

  return { curRole }
})
