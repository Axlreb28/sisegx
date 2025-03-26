import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  // Elimina process.env.BASE_URL
  history: createWebHistory(),
  routes
})

export default router