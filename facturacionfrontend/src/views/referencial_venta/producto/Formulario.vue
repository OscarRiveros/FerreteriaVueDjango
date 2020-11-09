<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-title>Producto</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="Productos.producto.codigobarra"
                :rules="nameRules"
                label="Código barra"
                autofocus
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="Productos.producto.descripcion"
                :rules="nameRules"
                label="Nombre Producto"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="Productos.producto.preciocompra"
                :rules="nameRules"
                label="Precio Compra"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="Productos.producto.precioventa"
                :rules="nameRules"
                label="Precio Venta"
                required
              ></v-text-field>
            </v-flex>
            <!-- Proveedor -->
            <v-flex xs12 sm12 md6>
              <v-autocomplete
                :items="Proveedor.proveedores"
                :item-text="
                  (item) => `${item.idproveedor} - ${item.nombre}`
                "
                item-value="idproveedor"
                label="Proveedor"
                v-model="Productos.producto.proveedor_idproveedor"
              ></v-autocomplete>
            </v-flex>
            <!-- Categoria -->
            <v-flex xs12 sm12 md6>
              <v-autocomplete
                :items="Categoria.categorias"
                :item-text="
                  (item) => `${item.idcategoria} - ${item.descripcion}`
                "
                item-value="idcategoria"
                label="Categoria"
                v-model="Productos.producto.categoria_idcategoria"
              ></v-autocomplete>
            </v-flex>
            <!-- Unidad de medida -->
            <v-flex xs12 sm12 md8>
              <v-autocomplete
                :items="Umedidas.umedidas"
                :item-text="
                  (item) => `${item.idunidadmedida} - ${item.descripcion}`
                "
                item-value="idunidadmedida"
                label="Unida de medidas"
                v-model="Productos.producto.unidad_de_medida_idunidadmedida"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm12 md4>
              <v-text-field
                v-model="Productos.producto.stock"
                :rules="nameRules"
                label="Stock"
                required
              ></v-text-field>
            </v-flex>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="Guardar"
            >
              Guardar
            </v-btn>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    valid: true,
    nameRules: [(v) => !!v || "Éste campo es obligatorio"],
  }),
  mounted() {
    this.$store.dispatch("getProveedores");
    this.$store.dispatch("getCategorias");
    this.$store.dispatch("getUmedidas");
  },
  computed: {
    ...mapState(["Productos", "Categoria", "Umedidas", "Proveedor"]),
  },
  methods: {
    Guardar() {
      this.$refs.form.validate()
      this.$store.dispatch("insert_Producto");
      // this.$store.dispatch("getProductos");
    },
  },
};
</script>