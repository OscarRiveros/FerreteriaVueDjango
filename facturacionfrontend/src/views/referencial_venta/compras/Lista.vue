<template>
  <v-card>
    <v-card-title>
      <v-flex xs10>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar Compras"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-row align="right" justify="space-around">
          <v-btn tile color="secondary" @click="activarModal">
            <v-icon left> add_task </v-icon>
            Nuevo
          </v-btn>
        </v-row>
      </v-flex>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="Compras.compras"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> payment </v-icon>
        <v-icon small @click="deleteItem(item)"> delete </v-icon>
      </template>
    </v-data-table>
    <!-- Dialogo PAGOS registro -->
    <v-dialog v-model="modalPagos" hide-overlay fluid max-width="800px">
      <Formulario/>
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
import Formulario from "../pagos/Formulario";
export default {
  data() {
    return {
      search: "",
      itemSelected:"",
      dialog: false,
      headers: [
        { text: "Numero de Factura", value: "numerofactura" },
        { text: "Fecha de Compra", value: "fechacompra" },
        { text: "Total Factura", value: "total" },
        { text: "Proveedor", value: "nombreproveedor" },
        {text: "Saldo", value: "saldo"},
        { text: "Opciones", value: "actions" },
      ],
    };
  },
  components:{
    Formulario,
  },
  mounted() {
    this.$store.dispatch("getCompra");
  },
  computed: {
    ...mapState(["Compras", "Pagos"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
    modalPagos: {
      get() {
        return this.$store.getters.getModal2;
      },
      set(value) {
        this.$store.dispatch("switchDialog2", value);
      },
    },
  },
  methods: {
    limpiarDatos(){
      this.$store.state.Compras.compra.idcompras = "";
      this.$store.state.Compras.compra.numerofactura = "";
      this.$store.state.Compras.compra.fechacompra = "";
      this.$store.state.Compras.compra.total = "";
      this.$store.state.Compras.compra.proveedor_idproveedor = "";
      this.$store.state.Compras.compra.saldo = "";
      this.$store.state.Compras.compra.nombreproveedor = "";
    },
    editItem(item) {
      console.log(item);
      this.Pagos.pago.montopago = item.saldo;
      this.Pagos.pago.compras_idcompras = item.idcompras;
      this.Pagos.pago.numerofactura = item.numerofactura;   
      this.$store.state.Compras.compra = item;
      this.$store.state.Compras.compra.nombreproveedor = item.nombreproveedor;
      this.Pagos.pago.nombreproveedor = item.nombreproveedor;
      this.modalPagos = true;
      console.log(this.modalPagos)
      // console.log(item);
    },
    activarModal() {
      this.modal = !this.modal;
      //this.modalPago = false;
      this.limpiarDatos();
    },
    deleteItem(item){
      this.dialog = !this.dialog;
      this.itemSelected = item
    },
    confirmardelete(){
      this.dialog = !this.dialog;
      this.$store.state.Compras.compra.idcompras = this.itemSelected.idcompras;
      this.$store.dispatch("eliminarCompra");
    }
  },
};
</script>

<style>
</style>