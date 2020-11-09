
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/cliente/"

  export const state= {
    clientes: [],
    cliente :{
          idcliente: '',
          nombre:'',
          apellido:'',
          ruc:'',
          telefono:'',
          direccion:''
      },
      editar: false,
  };
  export const mutations= {
      SET_CLIENTE(state, clientes){
          state.clientes = clientes
      },
  };
  export const actions= {
      getClientes({commit}){
          console.log("Obteniendo Clientes")
          axios
            .get(URL_API)
            .then(clientes => clientes.data)
            .then(clientes =>{
                commit('SET_CLIENTE', clientes);
            });
      },
      insert_Cliente({commit}){
          if (!state.editar) {
            axios
            .post(URL_API, state.cliente)
            .then(() => {
                axios
                    .get(URL_API)
                    .then((result) => {
                        commit('SET_CLIENTE', result.data)
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err);
            });
          }else{
              console.log("actualizando datos", state.cliente)
            axios({
                method:'PUT',
                url:URL_API+state.cliente.idcliente+'/',
                headers:{
                    'Content-Type': 'application/json',
                },
                data:{
                    nombre: state.cliente.nombre,
                    apellido: state.cliente.apellido,
                    ruc: state.cliente.ruc,
                    telefono: state.cliente.telefono,
                    direccion: state.cliente.direccion
                },
            }).then(()=>{
                axios
                .get(URL_API)
                .then(clientes => clientes.data)
                .then(clientes =>{
                    commit('SET_CLIENTE', clientes);
            });
            })
          }
      },

      eliminarCliente({commit}){
        axios
          .delete(URL_API+state.cliente.idcliente+'/')
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_CLIENTE', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
    }
  };
  export const modules= {};
