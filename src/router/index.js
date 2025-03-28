import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
// import Dashboard from '@/views/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    // {
    //     path: '/dashboard',
    //     name: 'Dashboard',
    //     component: Dashboard,
    //     meta: { requiresAuth: true }
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navegación con guardias
router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user')
    
    if (to.meta.requiresAuth) {
        if (!user) {
            // Si no hay usuario, redirigir al login
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router