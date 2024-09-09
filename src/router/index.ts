import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../components/Layout/HomeLayout.vue'
import ContentRouter from './ContentRouter'

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

export default router
