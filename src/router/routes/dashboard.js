// C:\xampp\htdocs\SISE\src\routes/dashboard.js
export default [
  {
    path: '/dashboard', // Cambia la ruta a '/dashboard'
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '', // Esta ruta está vacía para que cargue el Dashboard por defecto dentro de /dashboard
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      }
    ]
  }
]
