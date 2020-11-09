<template>
  <v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-title>Compras</v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md6>
              <v-text-field
                v-model="Pagos.pagos.montopago"
                :rules="nameRules"
                label="Monto Pagado"
                autofocus
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md6>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="Compras.compra.fechacompra"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="Compras.compra.fechacompra"
                    label="Fecha Compra"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="Compras.compra.fechacompra" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(Compras.compra.fechacompra)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <!-- Compras -->
            <v-flex xs12 sm12 md6>
              <v-autocomplete
                :items="Compra.compras"
                :item-text="(item) => `${item.idcompras} - ${item.numerofactura}`"
                item-value="idcompras"
                label="Compras"
                v-model="Pagos.pago.compras_idcompras"
              ></v-autocomplete>
            </v-flex>
            <v-flex>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="Guardar"
              >
                Guardar
              </v-btn>
            </v-flex>
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
    menu: false,
    modal: false,
  }),
  mounted() {
    this.$store.dispatch("getPagos");
    this.$store.dispatch("getCompra");
  },
  computed: {
    ...mapState(["Pagos", "Compra"]),
  },
  methods: {
    Guardar() {
      this.$refs.form.validate();
      this.$store.dispatch("insert_Pagos");
      // this.$store.dispatch("getProductos");
    },
  },
};
</script>