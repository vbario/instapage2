import Vue from 'vue'
import Router from 'vue-router'

import AppWrap from '@/pages/AppWrap'
import LandingPage from '@/pages/Landing'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: AppWrap,
      props: { mode: 'login' }
    },
    {
      path: '/pay/:uniqueid',
      name: 'PayPage',
      component: AppWrap,
      props: { mode: 'pay' }
    },
    {
      path: '/me',
      name: 'DashboardPage',
      component: AppWrap,
      props: { mode: 'dashboard' }
    },
    {
      path: '/income',
      name: 'IncomePage',
      component: AppWrap,
      props: { mode: 'income' }
    },
    {
      path: '/products',
      name: 'ProductsPage',
      component: AppWrap,
      props: { mode: 'products' }
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: AppWrap,
      props: { mode: 'settings' }
    },
    {
      path: '/fulfillment',
      name: 'FulfillmentPage',
      component: AppWrap,
      props: { mode: 'fulfillment' }
    },
    {
      path: '/appointments',
      name: 'AppointmentsPage',
      component: AppWrap,
      props: { mode: 'appointments' }
    },
    {
      path: '/add/:type',
      name: 'AddProductPage',
      component: AppWrap,
      props: { mode: 'add-product' }
    },
    {
      path: '/add/:type/:id',
      name: 'AddProductPage',
      component: AppWrap,
      props: { mode: 'add-product' }
    },

    {
      path: '/feel',
      name: 'ProductPage',
      component: AppWrap,
      props: { mode: 'product' }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: AppWrap,
      props: { mode: 'login' }
    },
    {
      path: '/account',
      name: 'AccountPage',
      component: AppWrap,
      props: { mode: 'account' }
    },
    {
      path: '/faq',
      name: 'FaqPage',
      component: AppWrap,
      props: { mode: 'faq' }
    },
    {
      path: '/500',
      name: 'Forbidden',
      component: AppWrap,
      props: { mode: 'forbidden' }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: AppWrap,
      props: { mode: 'notFound' }
    },
    {
      path: '*',
      redirect: '/404'
    }

  ]
})
