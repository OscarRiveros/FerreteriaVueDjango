<template>
  <v-container>
    <ListaCategoria />
    <v-layout>
      <v-dialog v-model="modal" hide-overlay fluid max-width="800px">
        <FormularioCategoria />
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import ListaCategoria from "../views/referencial_venta/ListaCategoria";
import FormularioCategoria from "../views/referencial_venta/FormularioCategoria";
export default {
  name: "Categoria",
  components: {
    ListaCategoria,
    FormularioCategoria,
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