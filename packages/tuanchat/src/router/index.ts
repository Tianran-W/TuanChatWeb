import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../layout/HomeLayout.vue'
import ContentRouter from './ContentRouter'
import { useUserStore } from '@/stores/user'
import pinia from '@/stores'

const userStore = useUserStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeLayout,
      children: ContentRouter
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !userStore.isSign) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
