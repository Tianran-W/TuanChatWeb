import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import MainLayout from '../layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: 'chat',
          name: 'chat',
          component: ChatView
        }
      ]
    }
  ]
})

export default router
