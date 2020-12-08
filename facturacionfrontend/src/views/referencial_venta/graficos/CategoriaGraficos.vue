<script>
import { Bar } from "vue-chartjs";
import axios from "axios";
const URL_API = "http://127.0.0.1/api/producto/";

export const state = {
  productos: [],
};

export default {
  extends: Bar,
  mounted() {
    console.log("Obteniendo Productos");
    axios
      .get(URL_API)
      .then((result) => {
        //console.log("resp", result.data[1].labels.map(label => label.label));
        console.log("datos ", result.data);
        this.dataset = result.data[1].stock;
        console.log("dataset:", this.dataset);
        this.labels = result.data[1].descripcion;
        console.log("label:", this.labels);
        this.setUpGraph();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      dataentry: null,
      datalabel: null,
      dataset: [],
      labels: [],
    };
  },
  methods: {
    setUpGraph() {
      this.renderChart(
        {
          labels: this.labels,
          data: this.dataset,
          datasets: [
            {
              label: "Productos",
              backgroundColor: ["#4BC0C0", "#FFCE56", "#FF6384"],
              type: "bar",
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
        }
      );
    },
  },
};
</script>

<style>
</style>
