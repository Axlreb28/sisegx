export default [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: 'tramites',
        name: 'Trámites',
        component: () => import('@/views/formulario/Tramites.vue'),
        children: [
          {
            path: 'formulario', // Cambié de "formulario/form" a "formulario"
            name: 'Formulario de Datos',
            component: () => import('@/views/formulario/Form.vue'),
          }
        ]
      }
    ]
  }
];
