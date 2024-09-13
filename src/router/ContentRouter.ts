import HomeView from '@/views/HomeView.vue'
import GroupView from '@/views/GroupView.vue'

const ContentRouter = [
  {
    path: '',
    name: 'main',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: 'group/:id',
    name: 'group',
    component: GroupView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: 'setting',
    name: 'setting',
    component: () => import('@/views/SettingView.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

export default ContentRouter
