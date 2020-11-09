<template>
  <v-card>
    <v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="Cliente.cliente.nombre"
            :rules="nameRules"
            label="Nombre"
            autofocus
            required
          ></v-text-field>
          <v-text-field
            v-model="Cliente.cliente.apellido"
            :rules="nameRules"
            label="Apellido"
            required
          ></v-text-field>
          <v-text-field
            v-model="Cliente.cliente.ruc"
            :rules="nameRules"
            label="C.I O RUC"
            required
          ></v-text-field>
          <v-text-field
            v-model="Cliente.cliente.telefono"
            :rules="nameRules"
            label="Telefono"
            required
          ></v-text-field>
          <v-text-field
            v-model="Cliente.cliente.direccion"
            :rules="nameRules"
            label="Direccion"
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
    ...mapState(["Cliente"]),
  },
  methods: {
    Guardar() {
      // this.$refs.form.validate()
      this.$store.dispatch("insert_Cliente");
      this.$store.dispatch("getClientes");
    },
  },
};
</script>