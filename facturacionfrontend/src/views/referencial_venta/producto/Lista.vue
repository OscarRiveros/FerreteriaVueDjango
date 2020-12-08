 <script src="print.js">
<link rel="stylesheet" type="text/css" href="print.css"></link>;
</script>
<template>
  <v-card>
    <v-card-title>
      <v-flex xs10>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar Productos"
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
      :items="Productos.productos"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> build </v-icon>
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
    <v-btn type="button" @click="imprimir">Lista de Productos</v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import print from "print-js";
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      itemSelected: "",
      dialog: false,
      headers: [
        { text: "Código de Barra", value: "codigobarra" },
        { text: "Descripción", value: "descripcion" },
        { text: "Precio compra", value: "preciocompra" },
        { text: "Precio venta", value: "precioventa" },
        { text: "Stock", value: "stock" },
        { text: "Opciones", value: "actions" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getItems");
  },
  computed: {
    ...mapState(["Productos"]),
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
      this.$store.state.Productos.producto.idproducto = "";
      this.$store.state.Productos.producto.codigobarra = "";
      this.$store.state.Productos.producto.preciocompra = "";
      this.$store.state.Productos.producto.precioventa = "";
      this.$store.state.Productos.producto.stock = "";
      this.$store.state.Productos.producto.descripcion = "";
      this.$store.state.Productos.producto.categoria_idcategoria = "";
      this.$store.state.Productos.producto.proveedor_idproveedor = "";
      this.$store.state.Productos.producto.unidad_de_medida_idunidadmedida = "";
    },
    editItem(item) {
      this.modal = !this.modal;
      this.$store.state.Productos.producto.idproducto = item.idproducto;
      this.$store.state.Productos.producto.codigobarra = item.codigobarra;
      this.$store.state.Productos.producto.preciocompra = item.preciocompra;
      this.$store.state.Productos.producto.precioventa = item.precioventa;
      this.$store.state.Productos.producto.stock = item.stock;
      this.$store.state.Productos.producto.descripcion = item.descripcion;
      this.$store.state.Productos.producto.categoria_idcategoria =
        item.categoria_idcategoria;
      this.$store.state.Productos.producto.proveedor_idproveedor =
        item.proveedor_idproveedor;
      this.$store.state.Productos.producto.unidad_de_medida_idunidadmedida =
        item.unidad_de_medida_idunidadmedida;
      this.$store.state.Productos.editar = true;
      // console.log(item);
    },
    activarModal() {
      this.modal = !this.modal;
      this.$store.state.Productos.editar = false;
      this.limpiarDatos();
    },
    deleteItem(item) {
      this.dialog = !this.dialog;
      this.itemSelected = item;
    },
    confirmardelete() {
      this.dialog = !this.dialog;
      this.$store.state.Productos.producto.idproducto = this.itemSelected.idproducto;
      this.$store.dispatch("eliminarProducto");
    },
    imprimir() {
      const producto_F = this.Productos.productos;
      printJS({
        printable: producto_F,
        properties: [
          { field: "codigobarra", displayName: "Codigo de Barra" },
          { field: "descripcion", displayName: "Producto" },
          { field: "precioventa", displayName: "Precio" },
          { field: "stock", displayName: "Stock" },
        ],
        type: "json",
        gridHeaderStyle: "color: Silver;  border: 6px solid green;",
        gridStyle: "border: 1px solid green;",
        header: "Lista de Productos",
        documentTitle: "Ferreteria San Luis",
      });
    },
  },
};
</script>

<style>
</style>