<template>
  <v-card outlined class="mx-auto">
    <v-form >
      <v-container>
        <v-row>
          <!-- Productos -->
          <!-- Agregar Productos -->
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  @click="modal = !modal"
                > +
                  <!-- <v-icon dark> mdi-plus </v-icon> -->
                </v-btn>
              </template>
              <span>Agregar nuevo Producto</span>
            </v-tooltip>
          </v-col>
          <!-- Seleccionar Productos -->
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="add_Venta.producto_idproducto"
              :items="Productos.productos"
              :item-text="
                (item) => `[${item.idproducto}] - ${item.descripcion}`
              "
              item-value="idproducto"
              label="Seleccionar producto"
              outlined
              @change="(idproducto) => obtenerProducto(idproducto)"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="add_Venta.cantidad"
              label="Cantidad"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="add_Venta.precioventa"
              label="Precio"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  fab
                  dark
                  color="green"
                  @click="agregarVenta()"
                >
                  +
                </v-btn>
              </template>
              <span>Agregar Ventas</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import FormularioProducto from "../../referencial_venta/producto/Formulario";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      add_Venta: this.detalle_venta(),
    };
  },
  mounted() {
    this.$store.dispatch("getItems");
  },
  components: {
    FormularioProducto,
  },
  computed: {
    ...mapState(["Productos", "Venta"]),
    ...mapGetters(["Iva10"]),

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
    detalle_venta() {
      return {
        ventas_idventas: "",
        producto_idproducto: "",
        descripcion: "",
        cantidad: 1,
        precioventa: 0,
        iva5: 0,
        iva10: 0,
      };
    },
    obtenerProducto(id) {
      let producto = this.Productos.productos.filter(
        (pro) => pro.idproducto === id
      );
      console.log(producto[0].descripcion)
      // this.$store.dispatch("getProducto", producto[0]);
      this.add_Venta.descripcion = producto[0].descripcion;
      this.add_Venta.precioventa = producto[0].precioventa;
      this.add_Venta.iva10 = parseFloat(producto[0].precioventa)/11;
      console.log(
        "Producto seleccionado: ",
         this.add_Venta.iva10.toFixed(2)
      );
    },
    agregarVenta() {
      console.log("agregando productos: ", this.add_Venta);
      const ventas_idventas = 0;
      const producto_idproducto = this.add_Venta.producto_idproducto;
      const descripcion = this.add_Venta.descripcion;
      const cantidad = parseFloat(this.add_Venta.cantidad);
      const precioventa = parseFloat(this.add_Venta.precioventa);
      const iva5 = 0;
      const iva10 = parseFloat(this.add_Venta.iva10.toFixed(2));
      this.$store.dispatch("addItemToVentas", {
        ventas_idventas,
        producto_idproducto,
        descripcion,
        cantidad,
        precioventa,
        iva5,
        iva10,
      });
      
    },

    close() {
      this.dialog = false;
      console.log("paso");
    },
  },
};
</script>>