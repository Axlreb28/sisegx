export default [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'tramites',
          name: 'Trámites',
          component: () => import('@/views/Tramites.vue'),
        }
      ]
    }
  ]
  