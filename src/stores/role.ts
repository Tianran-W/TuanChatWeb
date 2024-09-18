import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoleStore = defineStore('role', () => {
  const curRole = ref<number>(0)

  return { curRole }
})
