
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/producto/"

  export const state= {
    productos: [],
    producto:{
        idproducto: "",
        codigobarra:"",
        preciocompra:"",
        precioventa:"",
        stock:"",
        descripcion:"",
        categoria_idcategoria:"",
        proveedor_idproveedor:"",
        unidad_de_medida_idunidadmedida:"",
    },
    editar: false
  };
  export const mutations= {
      SET_PRODUCTO(state, productos){
          state.productos = productos
      },
  };
  export const actions= {
      getItems({commit}){
          console.log("Obteniendo Productos")
          axios
            .get(URL_API)
            .then(result => result.data)
            .then(result =>{
                commit('SET_PRODUCTO', result);
            });
      },
      insert_Producto({commit}){
        if (!state.editar) {
          axios
          .post(URL_API, state.producto)
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_PRODUCTO', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
        }else{
            console.log("actualizando datos", state.producto)
          axios({
              method:'PUT',
              url:URL_API+state.producto.idproducto+'/',
              headers:{
                  'Content-Type': 'application/json',
              },
              data:{
                codigobarra: state.producto.codigobarra,
                preciocompra: state.producto.preciocompra,
                precioventa: state.producto.precioventa,
                stock: state.producto.stock,
                descripcion: state.producto.descripcion,
                categoria_idcategoria: state.producto.categoria_idcategoria,
                proveedor_idproveedor: state.producto.proveedor_idproveedor,
                unidad_de_medida_idunidadmedida: state.producto.unidad_de_medida_idunidadmedida,
              },
          }).then(()=>{
              axios
              .get(URL_API)
              .then(result => result.data)
              .then(result =>{
                  commit('SET_PRODUCTO', result);
          });
          })
        }
    },
    eliminarProducto({commit}){
        axios
          .delete(URL_API+state.producto.idproducto+'/')
          .then(() => {
              axios
                  .get(URL_API)
                  .then((result) => {
                      commit('SET_PRODUCTO', result.data)
                  }).catch((err) => {
                      console.log(err)
                  });
          }).catch((err) => {
              console.log(err);
          });
    }
  };
  export const modules= {};
