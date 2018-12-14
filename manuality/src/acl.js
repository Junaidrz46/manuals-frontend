// * AclInstaller: plugin class for install in Vue with Vue.use
// * AclCreate: class to define acl settings
//   - initial: first permission, for startup with your app
//   - notfound: route for 404 error
//   - router: your VueRouter instance
//   - acceptLocalRules: if you can define new rules inside vue components
//   - globalRules: define globals rules for access in routes and any components
// * AclRule: class with rule builder, the instance receive initial permission.
// 	 - or: method for add OR condition in rule, e.g: if current permission is public OR admin the rule isPublic equals true
// 	 - and: method for add AND condition in rule, e.g: if current permission contains user AND inside the rule isLogged equals true
// 	 - generate: this method should called to create and compile your rule query

import Vue from 'vue'
import router from './router'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'

Vue.use(AclInstaller)

if (!localStorage.getItem('permissions')) {
  localStorage.setItem('permissions', 'public')
}

export default new AclCreate({
  initial: localStorage.getItem('permissions'),
  notfound: '/error',
  router,
  acceptLocalRules: true,
  globalRules: {
    isManualityAdmin: new AclRule('admin').generate(),
    
    isPublic: new AclRule('public').or('admin').or('consumer').or('company_admin').or('company_representative').generate(),

    isNotLogged: new AclRule('public').generate(),

    isConsumer: new AclRule('consumer').generate(),
    isCompanyAdmin: new AclRule('company_admin').generate(),
    isCompanyRepresentative: new AclRule('company_representative').generate(),
  }
})