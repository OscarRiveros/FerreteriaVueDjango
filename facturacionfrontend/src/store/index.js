import Vue from 'vue'
import Vuex from 'vuex'

import * as Categoria from './referencial_venta/categoria'
import * as dialogo from './dialogo/dialogo'
import * as Umedidas from '../store/referencial_venta/umedida'
import * as Proveedor from '../store/referencial_venta/proveedor'
import * as Productos from '../store/referencial_venta/productos'
import * as Cliente from '../store/referencial_venta/cliente'
import * as Compras from '../store/referencial_venta/compras'
import * as Pagos from '../store/referencial_venta/pagos'
import * as Venta from "../store/venta/venta"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Categoria,
    dialogo,
    Umedidas,
    Proveedor,
    Productos,
    Cliente,
    Compras,
    Pagos,
    Venta,
  }
})
