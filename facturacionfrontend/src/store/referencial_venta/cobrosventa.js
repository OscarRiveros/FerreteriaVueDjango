
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/ventas/"

  export const state= {
    ventas: [],
    venta:{
        idventas: "",
        numerodefactura:"",
        fecha: new Date().toISOString().substr(0, 10),
        cliente_idcliente:"",
        total:"",
    },
    editar: false
  };
  export const mutations= {
      SET_VENTAS(state, ventas){
          state.ventas = ventas
      },
  };
  export const actions= {
      getVenta({commit}){
          console.log("Obteniendo Ventas")
          axios
            .get(URL_API)
            .then(result => result.data)
            .then(result =>{
                commit('SET_VENTAS', result);
            });
      },
      insert_Ventas({commit, dispatch}){
        console.log(state.venta)
        if (!state.editar) {
          axios
          .post(URL_API, state.venta)
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_VENTAS', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
        }else{
            console.log("actualizando datos", state.venta)
          axios({
              method:'PUT',
              url:URL_API+state.venta.idventas+'/',
              headers:{
                  'Content-Type': 'application/json',
              },
              data:{
                numerodefactura: state.venta.numerodefactura,
                fecha: state.venta.fecha,
                total: state.venta.total,
                cliente_idcliente : state.venta.cliente_idcliente,
                  },
          }).then(()=>{
              axios
              .get(URL_API)
              .then(result => result.data)
              .then(result =>{
                  commit('SET_VENTAS', result);
          });
          })
        }
    },
    eliminarVenta({commit}){
        axios
          .delete(URL_API+state.venta.idventas+'/')
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_VENTAS', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
    }
  };
  export const modules= {};