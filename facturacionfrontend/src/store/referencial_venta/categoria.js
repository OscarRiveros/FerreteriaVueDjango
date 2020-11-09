import axios from "axios";
const URL_API = "http://127.0.0.1/api/categoria/";

export const state = {
  categorias: [],
  categoria: {
    idcategoria: "",
    descripcion: "",
  },
  editar: false,
};
export const mutations = {
  SET_CATEGORIA(state, categorias) {
    state.categorias = categorias;
  },
};
export const actions = {
  getCategorias({ commit }) {
    console.log("Obteniendo Categorias");
    axios
      .get(URL_API)
      .then((categorias) => categorias.data)
      .then((categorias) => {
        commit("SET_CATEGORIA", categorias);
      });
  },
  insert_Categorias({ commit }) {
    if (!state.editar) {
      axios
        .post(URL_API, state.categoria)
        .then(() => {
          axios
            .get(URL_API)
            .then((result) => {
              commit("SET_CATEGORIA", result.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("actualizando datos", state.categoria);
      axios({
        method: "PUT",
        url: URL_API + state.categoria.idcategoria + "/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          descripcion: state.categoria.descripcion,
        },
      }).then(() => {
        axios
          .get(URL_API)
          .then((categorias) => categorias.data)
          .then((categorias) => {
            commit("SET_CATEGORIA", categorias);
          });
      });
    }
  },

  eliminarCategoria({commit}){
    axios
      .delete(URL_API+state.categoria.idcategoria+'/')
      .then(() => {
          axios
              .get(URL_API)
              .then((result) => {
                  commit('SET_CATEGORIA', result.data)
              }).catch((err) => {
                  console.log(err)
              });
      }).catch((err) => {
          console.log(err);
      });
}


};
export const modules = {};
