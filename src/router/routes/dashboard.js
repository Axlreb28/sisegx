export default [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'dashboard', // ← esta es la clave
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
        }
      ]
    }
  ]
  