<template>
  <v-card outlined class="mx-auto" >
    <div>
      <Cabecera />
    </div>
    <br>
    <div>
        <Detalle/>
    </div>
    <br>
    <div>
        <ListaDetalle/>
    </div>
    <br>
    <div>
      <v-btn @click="insertVentas">Realizar Venta</v-btn>
    </div>
  </v-card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Cabecera from "../../src/views/referencial_venta/ventas/Cabecera";
import Detalle from "../../src/views/referencial_venta/ventas/Detalle";
import ListaDetalle from '../../src/views/referencial_venta/ventas/ListaDetalle';
export default {
  data(){
    return{
      alert: false,
    }
  },
  components: {
    Cabecera,
    Detalle,
    ListaDetalle,
  },
  computed: {
    ...mapState(["compras"]),
    ...mapGetters(["totalCompras"]),
  },
  methods: {
    insertVentas() {
      this.$store.dispatch("insertVentas")
    },
  },
};
</script>