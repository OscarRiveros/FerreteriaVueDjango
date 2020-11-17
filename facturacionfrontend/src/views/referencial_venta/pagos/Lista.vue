<template>
  <v-card>
    <v-card-title>
      <v-flex xs10>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar Pagos"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-row align="left" justify="space-around">
          <v-btn tile color="secondary" @click="activarModal">
            <v-icon left> add_task </v-icon>
            Nuevo
          </v-btn>
        </v-row>
      </v-flex>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="Pagos.pagos"
      :search="search"
      class="elevation-1"
    >
    </v-data-table>
    <!-- Dialogo PAGOS registro -->
    <v-dialog v-model="dialog" hide-overlay fluid>
      
    </v-dialog>
    <!-- Dialogo eliminar registro -->
    <v-dialog v-model="dialog" hide-overlay fluid max-width="800px">
      <v-card>
        <v-card-title class="headline">
          Seguro que desea eliminar el registro?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-2"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red"
            text
            @click="confirmardelete"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      itemSelected:"",
      dialog: false,
      headers: [
        { text: "ID Pago", value: "idpagos" },
        { text: "Monto Pago", value: "montopago" },
        { text: "Fecha pago ", value: "fechapago" },
        { text: "Numero Factura", value: "numerofactura" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getPagos");
  },
  computed: {
    ...mapState(["Pagos"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
  methods: {
    limpiarDatos(){
      this.$store.state.Pagos.pago.idpagos = "";
      this.$store.state.Pagos.pago.montopago = "";
      this.$store.state.Pagos.pago.fechapago = "";
      this.$store.state.Pagos.pago.numerofactura = "";
      this.$store.state.Pagos.pago.compras_idcompras = "";
    },
    editItem(item) {
      this.modal = !this.modal;
      this.$store.state.Pagos.pago.idpagos = item.idpagos;
      this.$store.state.Pagos.pago.montopago = item.montopago;
      this.$store.state.Pagos.pago.fechapago = item.fechapago;
      this.$store.state.Pagos.pago.numerofactura = item.numerofactura;
      this.$store.state.Pagos.pago.compras_idcompras  = item.compras_idcompras;    
      this.$store.state.Pagos.editar = true;
      // console.log(item);
    },
    activarModal() {
      this.modal = !this.modal;
      this.$store.state.Pagos.editar = false;
      this.limpiarDatos();
    },
    deleteItem(item){
      this.dialog = !this.dialog;
      this.itemSelected = item
    },
    confirmardelete(){
      this.dialog = !this.dialog;
      this.$store.state.Pagos.pago.idpagos = this.itemSelected.idpagos;
      this.$store.dispatch("eliminarPagos");
    }
  },
};
</script>

<style>
</style>