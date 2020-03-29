import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/page/index';
import waterFall from '@/components/page/waterFall';
import scrollPage from '@/components/page/scrollPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'index',
      component: index
    },
    {
      path: '/waterFall',
      name: 'waterFall',
      component: waterFall
    },
    {
      path: '/scrollPage',
      name: 'scrollPage',
      component: scrollPage
    }
  ]
})
