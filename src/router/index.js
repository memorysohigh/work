import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import contact from '@/view/contact'
import brands from '@/view/brands'
import goodslist from '@/view/GoodsList'
import models from '@/view/models'
import single from '@/view/single'
import cart from '@/view/cart'
import Address from '@/view/Address'
import OrderConfirm from '@/view/OrderConfirm'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/contact',
      name:'contact',
      component: contact,
    },
    {
      path:'/brands',
      name:'brands',
      component: brands,
    },
    {
      path:'/goodslist',
      name:'goodslist',
      component: goodslist,
    },
    {
      path:'/models',
      name:'models',
      component: models,
    },
    {
      path:'/single',
      name:'single',
      component: single,
    },
    {
      path:'/cart',
      name:'cart',
      component:cart,
    },
    {
      path:'/address',
      name:'Address',
      component:Address,
    },
    {
      path:'/orderConfirm',
      name:'OrderConfirm',
      component:OrderConfirm,
    },
    
  ]
})
