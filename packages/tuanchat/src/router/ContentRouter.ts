import { HomeView, LoginView, GroupView, SettingView, RoleView } from '@/views'

export const ContentRouter = [
  {
    path: '',
    name: 'main',
    component: HomeView,
    meta: {
      requiresAuth: false
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
    path: 'group/:id',
    name: 'group',
    component: GroupView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'role/:id',
    name: 'role',
    component: RoleView,
    meta: {
      requiresAuth: true
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
