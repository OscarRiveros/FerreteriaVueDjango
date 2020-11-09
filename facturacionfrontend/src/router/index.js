import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categoria from '../components/Categoria.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import(/* webpackChunkName: "about" */ '../components/Categoria.vue')
  },
  {
    path: '/umedidas',
    name: 'Umedidas',
    component: () => import(/* webpackChunkName: "about" */ '../components/Umedida.vue')
  },
  {
    path: '/proveedor',
    name: 'Proveedor',
    component: () => import(/* webpackChunkName: "about" */ '../components/Proveedor.vue')
  },
  {
    path: '/producto',
    name: 'Producto',
    component: () => import(/* webpackChunkName: "about" */ '../components/Producto.vue')
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: () => import(/* webpackChunkName: "about" */ '../components/Cliente.vue')
  },
  {
    path: '/compras',
    name: 'Compras',
    component: () => import(/* webpackChunkName: "about" */ '../components/Compras.vue')
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
