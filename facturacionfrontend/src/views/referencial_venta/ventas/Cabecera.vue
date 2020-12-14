<template>
  <v-card outlined class="mx-auto">
    <v-form>
      <v-container grid-list-md>
        <v-layout wrap>
          <!-- Fecha registro -->
          <v-flex xs12 sm12 md6>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="Venta.cabecera_venta.fecha"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="Venta.cabecera_venta.fecha"
                  label="Fecha"
                  v-on="on"
                  outlined
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                locale="Py"
                v-model="Venta.cabecera_venta.fecha"
                no-title
                scrollable
              >
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(Venta.cabecera_venta.fecha)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-flex>
          <!-- Número Factura -->
          <v-flex xs12 sm12 md6>
            <v-text-field
              v-model="Venta.cabecera_venta.numerofactura"
              
              label="Número Factura."
              required
              autofocus
              outlined
              clearable
            ></v-text-field>
          </v-flex>
          <!-- Proveedor -->
          <!-- Agregar Proveedor -->
          <v-flex xs12 sm12 md1>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="green"
                  fab
                  dark
                  @click="modal01 = !modal01"
                >+
                  <!-- <v-icon>mdi-account-circle</v-icon> -->
                </v-btn>
              </template>
              <span>Agregar nuevo Cliente</span>
            </v-tooltip>
          </v-flex>
          <!-- Seleccionar proveedor -->
          <v-flex xs12 sm12 md11>
            <v-autocomplete
              v-model="Venta.cabecera_venta.cliente_idcliente"
              :items="Cliente.clientes"
              :item-text="(item) => `${item.idcliente} - ${item.nombre}`"
              item-value="idcliente"
              label="Seleccionar Cliente"
              outlined
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      menu: false,
    };
  },
  mounted() {
    this.$store.dispatch("getItems");
    this.$store.dispatch("getClientes");
  },
  computed: {
    ...mapState(["Venta", "Productos", "Cliente"]),
    modal01: {
      get() {
        return this.$store.getters.getModal01;
      },
      set(value) {
        this.$store.dispatch("switchDialog01", value);
      },
    },
  },

  methods: {},
};
</script>