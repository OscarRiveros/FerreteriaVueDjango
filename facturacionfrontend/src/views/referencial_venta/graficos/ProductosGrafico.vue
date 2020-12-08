

<script src="https://cdn.jsdelivr.net/npm/babel-regenerator-runtime@6.5.0/runtime.js"></script>
<script src="https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.0.10/dist/vuetify.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs@3.4.0/dist/vue-chartjs.js"></script>
<template>
  
<div id="app">
        <v-row dense>
          <v-col cols="sm">
            <v-card class="pa-2" outlined tile raised>
              <my-line-chart v-if="ChartConfig.labels.length"  :line-data="ChartConfig" :chart-options="options"></my-line-chart>
            </v-card>
          </v-col>
          <v-col cols="sm">
            <v-card class="pa-2" outlined tile raised>
                  <my-bar-chart v-if="ChartConfig.labels.length" :bar-data="ChartConfig" :chart-options="options"></my-bar-chart> 
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="sm">
            <v-card class="pa-2" outlined tile raised>
              One of three columns
            </v-card>
          </v-col>
        </v-row>
</div>

</template>


<script>
//import { Vue } from 'vue';
//import VueChartJs from 'vue-chartjs'
//import vuetify from '../src/plugins/vuetify'

Vue.component('my-bar-chart', {
    extends: VueChartJs.Bar,
    props: ['barData', 'chartOptions'],
    mounted(){
      this.renderChart(this.barData, this.chartOptions);
    },
    /*watch: {
      barData () {
        console.log('bar data changed')
        this.renderChart(this.barData, this.chartOptions);
    },
      chartOptions () {
        this.renderChart(this.barData, this.chartOptions);
     }
    }*/
}, {
      responsive: true, 
      maintainAspectRatio: false
    })

Vue.component('my-line-chart', {
    extends: VueChartJs.Line,
    props: ['lineData', 'chartOptions'],
    mounted(){
      this.renderChart(this.lineData, this.chartOptions);
    }/*,
    watch:{
      lineData () {
        this.renderChart(this.lineData, this.chartOptions);
    },
      chartOptions () {
        this.renderChart(this.lineData, this.chartOptions);
    }
    } */
}, {
      responsive: true, 
      maintainAspectRatio: false
    })

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data() {
    return {
    ChartConfig: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: '#3498db',
          borderColor: 'rgba(136,136,136,0.5)',
          label: "2013"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          categoryPercentage: 0.5,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    },
    iceCream: [],
    drawer: false
  }
  },
  mounted: function () {
    this.getListData();
  },
  methods: {
    getListData: async function () {

      this.status = "getting data...";
     // var that = this;
            
       await axios.get("http://127.0.0.1/api/categoria/?format=json").then((response) => {
        console.log(response.data)
        this.getChartData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getChartData: function (chartData) {
      //console.log(chartData);
      for (var i = 0; i < chartData.length; i++) {
        this.ChartConfig.labels.push(chartData[i].Flavor)
        //this.$set(this.ChartConfig.labels,i,chartData[i].Flavor)
      }

      for (var i = 0; i < chartData.length; i++) {
       this.ChartConfig.datasets[0].data.push(chartData[i].Vote)
        //this.$set(this.ChartConfig.labels,i,chartData[i].Vote)
      }
      console.log(this.ChartConfig);
    }
  }
});
</script>