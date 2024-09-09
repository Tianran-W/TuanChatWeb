import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'

const ContentRouter = [
  {
    path: '',
    name: 'main',
    component: HomeView
  },
  {
    path: 'chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: 'login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]
export default ContentRouter
