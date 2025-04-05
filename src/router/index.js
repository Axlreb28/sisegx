/*
import { createRouter, createWebHistory } from 'vue-router'
import AuthService from '../services/auth'

// Importa automáticamente todos los archivos en /routes
const routeModules = import.meta.glob('./routes/*.js', { eager: true })
const routes = Object.values(routeModules).flatMap(m => m.default)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard de navegación mejorado
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/recuperar-password']
  const authRequired = !publicPages.includes(to.path)
  
  // Verificar si el usuario está autenticado
  const isAuthenticated = AuthService.isAuthenticated()
  
  // Verificar validez de la sesión (opcional)
  const isSessionValid = AuthService.checkSessionValidity()
  
  if (authRequired) {
    if (!isAuthenticated) {
      // Usuario no autenticado, redirigir al login
      return next('/login')
    } else if (!isSessionValid) {
      // Sesión expirada, limpiar datos y redirigir al login
      AuthService.logout()
      return next('/login?expired=true')
    }
  } else if (isAuthenticated && to.path === '/login') {
    // Si el usuario ya está autenticado e intenta ir a login, redirigir al dashboard
    return next('/dashboard')
  }
  
  next()
})

export default router

*/

import { createRouter, createWebHistory } from 'vue-router'

// Importa automáticamente todos los archivos en /routes
const routeModules = import.meta.glob('./routes/*.js', { eager: true })
const routes = Object.values(routeModules).flatMap(m => m.default)

const router = createRouter({
  history: createWebHistory(),
  routes, // Aquí se añaden todas las rutas, incluidas las de dashboard.js
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) return next('/login')
  next()
})

export default router