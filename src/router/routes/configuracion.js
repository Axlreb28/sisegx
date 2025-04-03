export default [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'configuracion',
        name: 'Configuración',
        component: () => import('@/views/Configuracion/index.vue'),
      },
      {
        path: 'configuracion/usuarios',
        name: 'Configuración de Usuarios',
        component: () => import('@/views/Configuracion/Usuarios.vue'),
      }
    ]
  }
]