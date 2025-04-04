export default [
  {
    path: '/formulario',
    component: () => import('@/layouts/MainLayout.vue'), // Usa el mismo layout que dashboard
    children: [
      {
        path: '',
        name: 'Formulario',
        component: () => import('@/views/formulario/Form.vue')
      }
    ]
  }
]
