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
import Lista from "../views/referencial_venta/unidadMedida/Lista";
import Formulario from "../views/referencial_venta/unidadMedida/Formulario";
export default {
  name: "Umedida",
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