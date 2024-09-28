import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { UserRole } from '@/services'

export const useRoleStore = defineStore('role', () => {
  const roleList = reactive<Map<number, UserRole>>(new Map<number, UserRole>())
  const currentRole = ref<number>()

  return { roleList, currentRole }
})
