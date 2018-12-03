import Vue from 'vue'
import Router from 'vue-router'

// Accounts
import CompanyAdminHome from '@/components/CompanyAdminHome'
import RepresentativeHome from '@/components/RepresentativeHome'
import ConsumerHome from '@/components/ConsumerHome'
// Product
import ProductPage from '@/components/ProductPage'
//Recent products
import RecentProducts from '@/components/RecentProducts'

Vue.use(Router)

const router  = new Router({
  routes: [
    {
      path: '/',
      component: RecentProducts,
      children: [
        {
          path: 'company_admin_home',
          name: 'CompanyAdminHome',
          component: CompanyAdminHome
        },
        {
          path: 'company_rep_home',
          name: 'CompanyRepresentativeHome',
          component: RepresentativeHome
        },
        {
          path: 'consumer_home',
          name: 'ConsumerHome',
          component: ConsumerHome
        },
        {
          path: 'products/:id',
          name: 'ProductPage',
          component: ProductPage
        }
      ]
    }
  ]
})

export default router;