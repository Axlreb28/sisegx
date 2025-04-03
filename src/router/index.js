import { createRouter, createWebHistory } from 'vue-router'

// Importa automáticamente todos los archivos en /routes
const routeModules = import.meta.glob('./routes/*.js', { eager: true })
const routes = Object.values(routeModules).flatMap(m => m.default)

const router = createRouter({
  history: createWebHistory(),
  routes,
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
