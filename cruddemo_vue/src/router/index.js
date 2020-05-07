import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const AddressListView = () => import('../views/AddressListView.vue')

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
