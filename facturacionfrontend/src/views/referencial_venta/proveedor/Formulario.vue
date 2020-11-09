<template>
  <v-card>
    <v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="Proveedor.proveedor.nombre"
            :rules="nameRules"
            label="Nombre"
            autofocus
            required
          ></v-text-field>
          <v-text-field
            v-model="Proveedor.proveedor.ruc"
            :rules="nameRules"
            label="C.I o Ruc"
            required
          ></v-text-field>
          <v-text-field
            v-model="Proveedor.proveedor.telefono"
            :rules="nameRules"
            label="Número de Teléfono"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="Guardar"
          >
            Guardar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card-title>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    valid: true,
    nameRules: [
      (v) => !!v || "Éste campo es obligatorio",
    ],
  }),
  computed: {
    ...mapState(["Proveedor"]),
  },
  methods: {
    Guardar() {
      // this.$refs.form.validate()
      this.$store.dispatch("insert_Proveedor");
      this.$store.dispatch("getProveedores");
    },
  },
};
</script>