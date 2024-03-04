import Vue from 'vue'
import Router from 'vue-router'

import AppWrap from '@/pages/AppWrap'
import LandingPage from '@/pages/Landing'

Vue.use(Router)


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: AppWrap,
      props: { mode: 'login' }
    },
    {
      path: '/editor',
      name: 'EditorPage',
      component: AppWrap,
      props: { mode: 'editor' }
    },
    {
      path: '/editor/:pageid',
      name: 'EditorPage',
      component: AppWrap,
      props: { mode: 'editor' }
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: AppWrap,
      props: { mode: 'settings' }
    },
    {
      path: '/work',
      name: 'WorkPage',
      component: AppWrap,
      props: { mode: 'work' }
    },
    {
      path: '/organization',
      name: 'OrganizationPage',
      component: AppWrap,
      props: { mode: 'organization' }
    },
    {
      path: '/more',
      name: 'MorePage',
      component: AppWrap,
      props: { mode: 'more' }
    },
    {
      path: '/theme',
      name: 'ThemePage',
      component: AppWrap,
      props: { mode: 'theme' }
    },
    {
      path: '/orders',
      name: 'OrdersPage',
      component: AppWrap,
      props: { mode: 'orders' }
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AppWrap,
      props: { mode: 'admin' }
    },
    {
      path: '/logout',
      name: 'LogoutPage',
      component: AppWrap,
      props: { mode: 'logout' }
    },
    {
      path: '/privacy',
      name: 'PrivacyPage',
      component: AppWrap,
      props: { mode: 'privacy' }
    },
    {
      path: '/terms',
      name: 'TermsPage',
      component: AppWrap,
      props: { mode: 'terms' }
    },
    {
      path: '/return',
      name: 'DashboardPage',
      component: AppWrap,
      props: { mode: 'dashboard' }
    },
    {
      path: '/plan',
      name: 'PlansPage',
      component: AppWrap,
      props: { mode: 'plan' }
    },
    {
      path: '/plans',
      name: 'PlansPage',
      component: AppWrap,
      props: { mode: 'plans' }
    },
    {
      path: '/linkinbio',
      name: 'LinkInBioEditor',
      component: AppWrap,
      props: { mode: 'linkinbio' }
    },
    {
      path: '/shipping',
      name: 'DashboardPage',
      component: AppWrap,
      props: { mode: 'shipping' }
    },
    {
      path: '/audience',
      name: 'DashboardPage',
      component: AppWrap,
      props: { mode: 'audience' }
    },
    {
      path: '/inventory',
      name: 'DashboardPage',
      component: AppWrap,
      props: { mode: 'inventory' }
    },
    {
      path: '/reauth',
      name: 'DashboardPage',
      component: AppWrap,
      props: { mode: 'dashboard' }
    },
    {
      path: '/pay/:uniqueid',
      name: 'PayPage',
      component: AppWrap,
      props: { mode: 'pay' }
    },
    {
      path: '/p/:uniqueid',
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
      path: '/start',
      name: 'StartPage',
      component: AppWrap,
      props: { mode: 'start' }
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
      path: '/:pageid',
      name: 'LinkInBioPage',
      component: AppWrap,
      props: { mode: 'page' }
    },
    {
      path: '/:user/blog',
      name: 'LinkInBioPage',
      component: AppWrap,
      props: { mode: 'link-in-bio', blog: 'true' }
    },
    {
      path: '/:user/2',
      name: 'LinkInBioPage',
      component: AppWrap,
      props: { mode: 'link-in-bio-2' }
    },
    {
      path: '/:user/p/:pageid',
      name: 'LinkInBioPage',
      component: AppWrap,
      props: { mode: 'link-in-bio', page: 'true'}
    },
    // {
    //   path: '/:user/:uniqueid',
    //   name: 'PayPage',
    //   component: AppWrap,
    //   props: { mode: 'pay' }
    // },
    {
      path: '/:pageid/:pagecode',
      name: 'EditorPage',
      component: AppWrap,
      props: { mode: 'editor' }
    },
    {
      path: '/:pageid/edit',
      name: 'EditorPage',
      component: AppWrap,
      props: { mode: 'editor' }
    },
    {
      path: '*',
      redirect: '/404'
    },

  ]
})

router.beforeEach((to, from, next) => {
  const tag = document.createElement('meta')
  const link = document.createElement('link')
  tag.setAttribute('name', 'description')
  link.setAttribute('rel', 'canonical')


  // if (to.name == 'PlansPage') {
  //   document.title = 'Plans'
  //   tag.setAttribute('content', '')
  //   link.setAttribute('href', `https://www.pushableapp.com/plans`)
  // } else if (to.name == 'StartPage') {
  //   if (to.query.mode == 'login') {
  //     document.title = 'Login'
  //     tag.setAttribute('content', 'Sign in to your Pushable account to manage your products, calendar, shipping, fulfillment, your page and more.')
  //     link.setAttribute('href', `https://www.pushableapp.com/start?mode=login`)
  //   } else if (to.query.mode == 'register') {
  //     document.title = 'Signup'
  //     tag.setAttribute('content', 'Join for free to start selling online with just a few clicks.')
  //     link.setAttribute('href', `https://www.pushableapp.com/start?mode=register`)
  //   }
  // } else if (to.name == 'LinkInBioPage') {
  //   let user = to.params.user
  //   document.title = '@' + user + ' on Pushable - Sell Online Without a Website!'
  // } else if (to.name == 'LoginPage') {
  //   tag.setAttribute('content', 'Sell directly to your customers from social media, blog or anywhere else. Imagine not having to make a website at all. Start selling with the free plan.')
  //   link.setAttribute('href', `https://www.pushableapp.com`)
  // } else {
  //   tag.setAttribute('content', 'Sell directly to your customers from social media, blog or anywhere else. Imagine not having to make a website at all. Start selling with the free plan.')
  // }
  // document.head.appendChild(tag)
  // document.head.appendChild(link)


  // console.log('ROUTER TITLE', to, from, next)
// If the route has a title, set it as the page title of the document/page
  // if (title) {
  // }
  // Continue resolving the route
  next()
})

export default router
