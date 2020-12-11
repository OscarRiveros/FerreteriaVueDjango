<template>
  <v-container>
    <ProductosGrafico/>
  </v-container>
</template>
<script>
import ProductosGrafico from "../views/referencial_venta/graficos/ProductosGrafico";
export default {
  name: "ProductosGrafico",
  components: {
    ProductosGrafico,
  },
  computed: {
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
};
</script>