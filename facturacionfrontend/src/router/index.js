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
  {
    path: '/pagos',
    name: 'Pagos',
    component: () => import(/* webpackChunkName: "about" */ '../components/Pagos.vue')
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import('../components/Ventas.vue')
  },
  {
    path: '/graficos',
    name: 'Graficos',
    component: () => import(/* webpackChunkName: "about" */ '../views/referencial_venta/graficos/ProductosGrafico.vue')
  },
  {
    path: '/ventasviews',
    name: 'VentasLista',
    component: () => import(/* webpackChunkName: "about" */ '../components/VentasVista.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
