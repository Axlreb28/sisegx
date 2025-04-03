export default [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'gestiones',
          name: 'Gestiones',
          component: () => import('@/components/Gestiones.vue')
,
        }
      ]
    }
  ]
  