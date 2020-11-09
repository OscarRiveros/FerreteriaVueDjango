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
      :items="Compras.compras"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> build </v-icon>
        <v-icon small @click="deleteItem(item)"> delete </v-icon>
      </template>
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
import Pagos from "../pagos/Formulario";
export default {
  data() {
    return {
      search: "",
      itemSelected:"",
      dialog: false,
      headers: [
        { text: "Numero de Facrtura", value: "numerofactura" },
        { text: "Fecha de Compra", value: "fechacompra" },
        { text: "Total ", value: "total" },
        { text: "Proveedor", value: "proveedor_idproveedor" },
        {text: "Saldo", value: "saldo"},
        { text: "Opciones", value: "actions" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getCompra");
  },
  computed: {
    ...mapState(["Compras"]),
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
      this.$store.state.Compras.compra.idcompras = "";
      this.$store.state.Compras.compra.numerofactura = "";
      this.$store.state.Compras.compra.fechacompra = "";
      this.$store.state.Compras.compra.total = "";
      this.$store.state.Compras.compra.proveedor_idproveedor = "";
      this.$store.state.Compras.compra.saldo = "";
    },
    editItem(item) {
      this.modal = !this.modal;
      this.$store.state.Compras.compra.idcompras = item.idcompras;
      this.$store.state.Compras.compra.numerofactura = item.numerofactura;
      this.$store.state.Compras.compra.fechacompra = item.fechacompra;
      this.$store.state.Compras.compra.total = item.total;
      this.$store.state.Compras.compra.proveedor_idproveedor  = item.proveedor_idproveedor;
      this.$store.state.Compras.compra.saldo = item.saldo;      
      this.$store.state.Compras.editar = true;
      // console.log(item);
    },
    activarModal() {
      this.modal = !this.modal;
      this.$store.state.Compras.editar = false;
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