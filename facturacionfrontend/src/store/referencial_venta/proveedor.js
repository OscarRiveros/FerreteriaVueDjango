
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/proveedor/"

  export const state= {
    proveedores: [],
    proveedor :{
          idproveedor: '',
          nombre:'',
          telefono:'',
          ruc:''
      },
      editar: false,
  };
  export const mutations= {
      SET_PROVEEDOR(state, proveedores){
          state.proveedores = proveedores
      },
  };
  export const actions= {
      getProveedores({commit}){
          console.log("Obteniendo Proveedores")
          axios
            .get(URL_API)
            .then(proveedores => proveedores.data)
            .then(proveedores =>{
                commit('SET_PROVEEDOR', proveedores);
            });
      },
      insert_Proveedor({commit}){
          if (!state.editar) {
            axios
            .post(URL_API, state.proveedor)
            .then(() => {
                axios
                    .get(URL_API)
                    .then((result) => {
                        commit('SET_PROVEEDOR', result.data)
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err);
            });
          }else{
              console.log("actualizando datos", state.proveedor)
            axios({
                method:'PUT',
                url:URL_API+state.proveedor.idproveedor+'/',
                headers:{
                    'Content-Type': 'application/json',
                },
                data:{
                    nombre: state.proveedor.nombre,
                    telefono: state.proveedor.telefono,
                    ruc: state.proveedor.ruc,
                },
            }).then(()=>{
                axios
                .get(URL_API)
                .then(proveedores => proveedores.data)
                .then(proveedores =>{
                    commit('SET_PROVEEDOR', proveedores);
            });
            })
          }
      },

      eliminarProveedor({commit}){
        axios
          .delete(URL_API+state.proveedor.idproveedor+'/')
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_PROVEEDOR', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
    }
  };
  export const modules= {};
