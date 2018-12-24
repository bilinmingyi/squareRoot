import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path:'/',
      redirect:'/root'
    },
    {
      path: '/root',
      name: 'root',
      components: {
        Left:() => import('@/page/rootLeft/rootLeft.vue'),
        Middle: () =>import('@/page/rootMiddle.vue'),
        Right: ()=>import('@/page/rootRight.vue'),
        Header: ()=>import('@/components/fHeader.vue')
      }
    },
    {
      path: '/assist',
      name: 'assist',
      component: () => import('@/page/assistPage.vue')
    }


  ]
})
