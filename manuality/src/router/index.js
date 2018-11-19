import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CompanyAdminHome from '@/components/CompanyAdminHome'

Vue.use(Router)

const router  = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/company_admin_home',
      name: 'CompanyAdminHome',
      component: CompanyAdminHome
    }
  ]
})

export default router;