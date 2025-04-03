export default [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '', // ← esta es la clave
          name: 'Dashboard',
          component: () => import('@/views/Dashboard.vue'),
        }
      ]
    }
  ]
  