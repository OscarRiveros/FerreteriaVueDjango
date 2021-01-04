<template>
  <v-card>
    <v-card-title>
      <v-flex xs10>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar Facturas"
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
      :items="VentasLista.ventas"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> payment </v-icon>
        <v-icon small @click="deleteItem(item)"> delete </v-icon>
      </template>
    </v-data-table>
    <!-- Dialogo eliminar registro -->
    <v-dialog v-model="dialog" hide-overlay fluid max-width="800px">
      <v-card>
        <v-card-title class="headline">
          Seguro que desea eliminar el registro?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="red" text @click="confirmardelete"> Eliminar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn type="button" @click="imprimir">Lista de Facturas Venta</v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      itemSelected: "",
      dialog: false,
      headers: [
        { text: "Numero de Factura", value: "numerofactura" },
        { text: "Fecha de Venta", value: "fecha" },
        { text: "Total Factura", value: "total" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getVenta");
  },
  computed: {
    ...mapState(["VentasLista"]),
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
    limpiarDatos() {
      this.$store.state.Ventas.ventas.idfactura = "";
      this.$store.state.Ventas.ventas.numerofactura = "";
      this.$store.state.Ventas.ventas.fecha = "";
      this.$store.state.Ventas.ventas.total = "";
      this.$store.state.Ventas.ventas.cliente_idcliente = "";
    },
    editItem(item) {
     this.modal = !this.modal;
      this.Pagos.pago.montopago = item.saldo;
      this.$store.state.Ventas.ventas.idfactura = item.idfactura;
      this.$store.state.Ventas.ventas.numerofactura = item.numerofactura;
      this.$store.state.Ventas.ventas.fecha = item.fecha;
      this.$store.state.Ventas.ventas.total = item.total;
      this.$store.state.Compras.compra.nombreproveedor = item.nombreproveedor;
       
    },
    activarModal() {
      this.modal = !this.modal;
      //this.modalPago = false;
      this.limpiarDatos();
    },
    deleteItem(item) {
      this.dialog = !this.dialog;
      this.itemSelected = item;
    },
    confirmardelete() {
      this.dialog = !this.dialog;
      this.$store.state.Compras.compra.idcompras = this.itemSelected.idcompras;
      this.$store.dispatch("eliminarCompra");
    },
    imprimir() {
      const producto_F = this.VentasLista.ventas;
      printJS({
        printable: producto_F,
        properties: [
          { field: "numerofactura", displayName: "Numero de Factura" },
          { field: "fecha", displayName: " Fecha de Venta" },
          { field: "total", displayName: "Total Factura" },
          { field: "cliente_idcliente", displayName: "Cliente" },
        ],
        type: "json",
        gridHeaderStyle: "color: Silver;  border: 6px solid green;",
        gridStyle: "border: 1px solid green;",
        header: "Lista Gral de Compras",
        documentTitle: "Ferreteria San Luis",
      });
    },
  },
};
</script>