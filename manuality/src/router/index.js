// [ Packages ]
import Vue from 'vue'
import Router from 'vue-router'
import { AclRule } from 'vue-acl'

// [ Components ]
//   Accounts
import CompanyAdminHome from '@/components/CompanyAdminHome'
import RepresentativeHome from '@/components/RepresentativeHome'
import ConsumerHome from '@/components/ConsumerHome'
  // Product
import ProductPage from '@/components/ProductPage'
  //Recent products
import RecentProducts from '@/components/RecentProducts'
// Search
import Search from '@/components/Search'
//Signup
import SignUp from '@/components/SignUp'


Vue.use(Router)


const router  = new Router({
  routes: [
    { path: '/', meta: { rule: 'isPublic' }}, //component: RecentProducts
    { path: '/company_admin_home'       , component: CompanyAdminHome  , meta: { rule: 'isCompanyAdmin' }         , name: 'CompanyAdminHome' },
    { path: '/company_rep_home'         , component: RepresentativeHome, meta: { rule: 'isCompanyRepresentative' }, name: 'CompanyRepresentativeHome' },
    { path: '/consumer_home'            , component: ConsumerHome      , meta: { rule: 'isConsumer' }             , name: 'ConsumerHome' },
    { path: '/products/:id'             , component: ProductPage       , meta: { rule: 'isPublic' }               , name: 'ProductPage' },
    { path: '/search/:search_query'     , component: Search            , meta: { rule: 'isPublic' }               , name: 'Search' },
    { path: '/signup'                   , component: SignUp            , meta: { rule: 'isPublic'}                , name: 'SignUp'}

  ]
})

console.log(router)

export default router;