
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/unidadmedida/"

  export const state= {
      umedidas: [],
      umedida :{
        idunidadmedida: '',
        descripcion:''
      },
      editar: false,
  };
  export const mutations= {
      SET_UMEDIDA(state, umedida){
          state.umedidas = umedida
      },
  };
  export const actions= {
      getUmedidas({commit}){
          console.log("Obteniendo Umedidas")
          axios
            .get(URL_API)
            .then(umedida => umedida.data)
            .then(umedida =>{
                commit('SET_UMEDIDA', umedida);
            });
      },
      insert_Umedida({commit}){
          if (!state.editar) {
            axios
            .post(URL_API, state.umedida)
            .then(() => {
                axios
                    .get(URL_API)
                    .then((result) => {
                        commit('SET_UMEDIDA', result.data)
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err);
            });
          }else{
              console.log("actualizando datos", state.umedida)
            axios({
                method:'PUT',
                url:URL_API+state.umedida.idunidadmedida+'/',
                headers:{
                    'Content-Type': 'application/json',
                },
                data:{
                    descripcion: state.umedida.descripcion
                },
            }).then(()=>{
                axios
                .get(URL_API)
                .then(umedida => umedida.data)
                .then(umedida =>{
                    commit('SET_UMEDIDA', umedida);
            });
            })
          }
      },


      eliminarUmedidas({commit}){
        axios
          .delete(URL_API+state.umedida.idunidadmedida+'/')
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_UMEDIDA', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
    }
  };
  export const modules= {};
