import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      redirect: '/root'
    },
    {
      path: '/root',
      components: {
        Left: () => import('@/page/rootLeft/rootLeft.vue'),
        Middle: () => import('@/page/rootMiddle.vue'),
        Right: () => import('@/page/rootRight.vue'),
        Header: () => import('@/components/fHeader.vue')
      }
    },
    {
      path: '/assist',
      components: {
        default: () => import('@/page/assistPage.vue'),
        Header: () => import('@/components/assistPage/aHeader.vue')
      }
    }


  ]
})
