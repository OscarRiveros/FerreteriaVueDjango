
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/compras/"

  export const state= {
    compras: [],
    compra:{
        idcompras: "",
        numerodefactura:"",
        fechacompra: new Date().toISOString().substr(0, 10),
        total:"",
        estado:"1",
        proveedor_idproveedor:"",
        saldo:"",
        nombreproveedor:"",
    },
    editar: false
  };
  export const mutations= {
      SET_COMPRA(state, compras){
          state.compras = compras
      },
  };
  export const actions= {
      getCompra({commit}){
          console.log("Obteniendo Compras")
          axios
            .get(URL_API)
            .then(result => result.data)
            .then(result =>{
                commit('SET_COMPRA', result);
            });
      },
      insert_Compra({commit, dispatch}){
        console.log(state.compra)
        if (!state.editar) {
          state.compra.saldo = state.compra.total;
          axios
          .post(URL_API, state.compra)
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_COMPRA', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
        }else{
            console.log("actualizando datos", state.compra)
          axios({
              method:'PUT',
              url:URL_API+state.compra.idcompras+'/',
              headers:{
                  'Content-Type': 'application/json',
              },
              data:{
                numerodefactura: state.compra.numerodefactura,
                fechacompra: state.compra.fechacompra,
                total: state.compra.total,
                estado: state.compra.estado,
                proveedor_idproveedor: state.compra.proveedor_idproveedor,
                saldo: state.compra.saldo,
                  },
          }).then(()=>{
              axios
              .get(URL_API)
              .then(result => result.data)
              .then(result =>{
                  commit('SET_COMPRA', result);
          });
          })
        }
    },
    eliminarCompra({commit}){
        axios
          .delete(URL_API+state.compra.idcompras+'/')
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_COMPRA', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
    }
  };
  export const modules= {};