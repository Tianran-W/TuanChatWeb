import { HomeView, LoginView, GroupView, SettingView } from '@/views'

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
    component: LoginView,
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
