<template>
  <v-container>
    <Lista />
    <v-layout>
      <v-dialog v-model="modal" hide-overlay fluid max-width="800px">
        <Formulario />
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import Lista from "../views/referencial_venta/proveedor/Lista";
import Formulario from "../views/referencial_venta/proveedor/Formulario";
export default {
  name: "Proveedor",
  components: {
    Lista,
    Formulario,
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