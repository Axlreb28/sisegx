// C:\xampp\htdocs\SISE\src\router\index.js
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

