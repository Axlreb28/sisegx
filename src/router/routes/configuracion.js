export default [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'configuracion',
          name: 'Configuración',
          component: () => import('@/views/Configuracion.vue'),
        }
      ]
    }
  ]
  