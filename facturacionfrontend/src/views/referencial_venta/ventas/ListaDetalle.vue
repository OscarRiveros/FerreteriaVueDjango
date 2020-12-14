<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <v-data-table
      :hide-default-footer="true"
      :headers="headers"
      :items="Venta.listaVentas"
    >
      <!-- <v-responsive class="overflow-y-auto" max-height="calc(90vh - 520px)"> -->
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.producto_idproducto}}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ item.precioventa }}</td>
          <td>{{ item.iva5 }}</td>
          <td>{{ item.iva10 }}</td>
          <td>{{ (item.SubTotal = item.precioventa * item.cantidad) }}</td>
          <td>
            <v-btn class="mx-2" fab dark small color="red" @click="removeItem(item)">-</v-btn
            >
          </td>
        </tr>
      </template>
      <!-- </v-responsive> -->
      <template slot="body.append">
        <tr class="pink--text">
          <th class="title">Total Iva10</th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title">{{TotalIva}}</th>
          <th class="title"></th>
          <th class="title"></th>
        </tr>
      </template>
      <template slot="body.append">
        <tr class="pink--text">
          <th class="title">Total</th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title"></th>
          <th class="title">{{TotalVentas}}</th>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Código",
          value: "producto_idproducto",
        },
        { text: "Descripción", value: "descripcion" },
        { text: "Cantidad", value: "Cantidad" },
        { text: "Precio", value: "cantidad" },
        { text: "Iva 5%", value: "iva5" },
        { text: "Iva 10%", value: "iva10" },
        { text: "Subtotal", value: "subtotal" },
        { text: "Opciones", value: "opcion" },
      ],
    };
  },
  computed: {
    ...mapState(["Venta"]),
    TotalVentas() {
      return this.$store.getters.TotalVentas;
    },

    TotalIva() {
      return this.$store.getters.TotalIva;
    },
  },
  methods:{
    removeItem(item) {
      console.log(item);
      this.Ventas.listaVentas.splice(item, 1);
    }
  }
};
</script>