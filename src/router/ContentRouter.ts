import HomeView from '@/views/HomeView.vue'
import ChatView from '@/views/GroupView.vue'
import SettingView from '@/views/SettingView.vue'

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
    path: 'group',
    name: 'group',
    component: ChatView,
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
    component: SettingView,
    meta: {
      requiresAuth: true
    }
  }
]

export default ContentRouter
