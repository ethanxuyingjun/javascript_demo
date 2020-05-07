import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const AddressListView = require('../views/AddressListView.vue').default;

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/address', component: AddressListView },
      { path: '/', redirect: '/address' }
    ]
  })
}
