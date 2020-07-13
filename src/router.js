import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Panel',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Saldo de cuentas
        {
          name: 'Consulta de saldos',
          path: 'admin/accounts/balance',
          component: () => import('@/views/admin/accounts/account-balance'),
        },
        // Perfil de Usuario
        {
          name: 'Perfil de Usuario',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        // Menú mantenimiento
        {
          name: 'Mantenimiento',
          path: '/admin/maintenance',
          component: () => import('@/views/admin/Manteinance'),
        },
        // Menú mantenimiento
        {
          name: 'Cuentas Bancarias',
          path: '/admin/accounts/list',
          component: () => import('@/views/admin/accounts/account-list'),
        },
        // Menú mantenimiento
        {
          name: 'Tipos de Transacciones',
          path: '/admin/transactionTypes/list',
          component: () => import('@/views/admin/transactionTypes/transactionTypes-list'),
        },
        {
          name: 'Tipo de Transacción',
          path: '/admin/transactionTypes/createoredit',
          component: () => import('@/views/admin/transactionTypes/transactionTypes-createOrEdit'),
        },
        {
          name: 'Procesos',
          path: '/process/processmenu',
          component: () => import('@/views/process/ProcessMenu'),
        },
        {
          name: 'Reportes',
          path: '/reports/reportsmenu',
          component: () => import('@/views/reports/ReportsMenu'),
        },
      ],
    },
  ],
})
