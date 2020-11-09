<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                ><v-btn text :to="item.go">{{
                  item.title
                }}</v-btn></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
        <!-- Menu Administrar Productos -->
        <template>
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-icon>
                <v-icon>view_list</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Adm Productos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="admProducto in admProductos"
              :key="admProducto.title"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ admProducto.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><v-btn text :to="admProducto.go">{{
                    admProducto.title
                  }}</v-btn></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-group>
             <v-list-item slot="activator">
              <v-list-item-icon>
                <v-icon>view_list</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Compras</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="Compras in Compras"
              :key="Compras.title"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ Compras.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  ><v-btn text :to="Compras.go">{{
                    Compras.title
                  }}</v-btn></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
        <!-- Fin Menu administrar Productos -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="green darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">System Ferreteria Luis</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Categoria from './components/Categoria'
export default {
  name: "App",

  components: {
    // HelloWorld,
    Categoria
  },

  data: () => ({
    drawer: null,
    items: [
      { title: "Inicio", icon: "home", go: "/" },
      // { title: 'About', icon: 'forum', go:'/about' },
    ],
    // Administrar Productos
    admProductos: [
      { title: "Productos", icon: "add_business", go: "/producto" },
      { title: "Categoria", icon: "forum", go: "/Categorias" },
      { title: "U de Medidas", icon: "home", go: "umedidas" },
      { title: "Proveedor", icon:"perm_identity", go:"/proveedor"},
      { title: "Cliente", icon:"perm_identity", go:"/cliente"},
    ],
    Compras: [
      { title: "Compras", icon:"add_business", go: "/compras"},
      { title: "Pagos", icon:"add_business", go: "/pagos"},
    ],
  }),
};
</script>
