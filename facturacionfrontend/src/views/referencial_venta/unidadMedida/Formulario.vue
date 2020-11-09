<template>
  <v-card>
    <v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="Umedidas.umedida.descripcion"
            :counter="10"
            :rules="nameRules"
            label="Descripción"
            autofocus
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
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
  }),
  computed: {
    ...mapState(["Umedidas"]),
  },
  methods: {
    Guardar() {
      // this.$refs.form.validate()
      this.$store.dispatch("insert_Umedida");
      this.$store.dispatch("getUmedidas");
    },
  },
};
</script>