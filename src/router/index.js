import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Inicio from '@/views/Inicio.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/inicio',
        name: 'Inicio',
        component: Inicio,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user')

    if (to.meta.requiresAuth && !user) {
        next('/')
    } else {
        next()
    }
})

export default router
