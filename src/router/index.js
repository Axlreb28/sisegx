import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import Dashboard from '@/views/Dashboard.vue';
import Tramites from '@/views/Tramites.vue';
import Reportes from '@/views/Reportes.vue';
import Configuracion from '@/views/Configuracion.vue';
import Login from '@/views/Login.vue';
import Gestiones from '@/views/Gestiones.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/tramites',
        name: 'Trámites',
        component: Tramites
      },
      {
        path: '/reportes',
        name: 'Reportes',
        component: Reportes
      },
      {
        path: '/configuracion',
        name: 'Configuración',
        component: Configuracion
      },
      {
        path: '/gestiones',
        name: 'Gestiones',
        component: Gestiones
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // Redirigir a login si no está autenticado y la ruta requiere autenticación
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;