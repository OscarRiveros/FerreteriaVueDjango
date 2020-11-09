<template>
  <v-card>
    <v-card-title>
      <v-flex xs10>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Filtrar Categoría"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-row align="left" justify="space-around">
          <v-btn tile color="secondary" @click="newRegister">
            <v-icon left> add_task </v-icon>
            Nuevo
          </v-btn>
        </v-row>
      </v-flex>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="Categoria.categorias"
      :search="search"
      class="elevation-1"
    >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        build
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    </v-data-table>

    <!-- Dialogo eliminar registro -->
    <v-dialog v-model="dialog" hide-overlay fluid max-width="800px">
      <v-card>
        <v-card-title class="headline">
          Seguro que desea eliminar el registro?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-2"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="red"
            text
            @click="confirmardelete"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      dialog: false,
      itemSelected: "",
      headers: [
        { text: "ID Categoria", value: "idcategoria" },
        { text: "Descripciṕn", value: "descripcion" },
        {text: "Opciones", value:"actions"}
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getCategorias");
  },
  computed: {
    ...mapState(["Categoria"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
  methods:{
    limpiarDatos(){
      this.$store.state.Categoria.categoria.idcategoria = "";
      this.$store.state.Categoria.categoria.descripcion = "";
    },
    editItem(item){
      this.modal = !this.modal;
      this.$store.state.Categoria.categoria.idcategoria = item.idcategoria;
      this.$store.state.Categoria.categoria.descripcion = item.descripcion;
      this.$store.state.Categoria.editar = true
      // console.log(item);
    },
    deleteItem(item){
      this.dialog = !this.dialog;
      this.itemSelected = item
    },
    confirmardelete(){
      this.dialog = !this.dialog;
      this.$store.state.Categoria.categoria = this.itemSelected;
      this.$store.dispatch("eliminarCategoria");
    },
    newRegister(){
      this.modal = !this.modal
      this.$store.state.Categoria.editar = false;
      this.limpiarDatos();
    }
  },
};
</script>

<style>
</style>