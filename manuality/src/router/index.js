import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CompanyAdminHome from '@/components/CompanyAdminHome'
import RepresentativeHome from '@/components/RepresentativeHome'
import ConsumerHome from '@/components/ConsumerHome'

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
    },
    {
      path: '/company_rep_home',
      name: 'CompanyRepresentativeHome',
      component: RepresentativeHome
    },
    {
      path: '/consumer_home',
      name: 'ConsumerHome',
      component: ConsumerHome
    }
  ]
})

export default router;