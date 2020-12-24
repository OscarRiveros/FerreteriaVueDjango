import axios from 'axios'
const URL_API = "http://127.0.0.1/api/ventas"
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export const state = {
    cabecera_venta: {
        idventas: 0,
        numerofactura: "",
        fecha: new Date().toISOString().substr(0, 10),
        totaliva5: 0,
        totaliva10: "",
        total: 0.0,
        cliente_idcliente: 1,   
    },
    detalle_venta:{
        ventas_idventas: "",
        producto_idproducto:"",
        cantidad: "",
        iva5: "",
        iva10:"",
        precioventa:"",
    },
    listaVentas: [],
    listaRegistro: [],
    vuelto: 0,
    montoPago: 0,
};

export const mutations = {
    SET_CABECERA(state, cabecera_venta){
        state.cabecera_venta = cabecera_venta;
    },

    SET_DETALLE(state, detalle_venta){
        state.detalle_venta = detalle_venta;
    },

    SET_LISTA_VENTAS(state, {ventas_idventas, producto_idproducto, descripcion, cantidad, precioventa, iva5, iva10}){
        // let ventas_idventas = 0;
        let productoInLista = state.listaVentas.find(item=>{
            return item.producto_idproducto == producto_idproducto;
        });

        if (productoInLista) {
            productoInLista.cantidad += cantidad;
            let iva = ((productoInLista.cantidad * precioventa)/11).toFixed(2);
            productoInLista.iva10 = iva; 
            return;
        }

        state.listaVentas.push({ventas_idventas, producto_idproducto, descripcion, cantidad, iva5, iva10, precioventa});
    }
};

export const actions = {
    addItemToVentas({commit}, {ventas_idventas, producto_idproducto, descripcion, cantidad, precioventa, iva5, iva10,}){
        commit('SET_LISTA_VENTAS', {
            ventas_idventas,
                producto_idproducto,
                descripcion,
                cantidad,
                precioventa,
                iva5,
                iva10,
            });
                console.log(producto_idproducto, descripcion, cantidad, precioventa, iva5, iva10);
        },

        insertVentas({rootState}){
            let variableiva = state.cabecera_venta.totaliva10.toFixed(2);
            state.cabecera_venta.totaliva10 = variableiva;
            console.log(variableiva)
            axios
                .post(URL_API, {cabecera: state.cabecera_venta, detalle: state.listaVentas})
                .then(() => {
                    console.log("Good luck!", rootState.Productos.productos);
                    state.listaVentas=[]
                    state.cabecera_venta ={
                        idventas: 0,
                        numerofactura: "",
                        fecha: new Date().toISOString().substr(0, 10),
                        totaliva5: 0,
                        totaliva10: "",
                        total: 0.0,
                        cliente_idcliente: 1,   
                    }
                }).catch((err) => {
                    console.log("error: ", err);
                });
        }
};

export const getters={
    TotalVentas: state =>{
        state.cabecera_venta.total = 0.0;
        state.listaVentas.forEach(element => {
            state.cabecera_venta.total += element.precioventa * element.cantidad;
        });
        return state.cabecera_venta.total;
    },

    TotalIva: state =>{
        state.cabecera_venta.totaliva10 = 0;
        state.listaVentas.forEach(element => {
            state.cabecera_venta.totaliva10 += (element.precioventa * element.cantidad)/11;
        });
        return state.cabecera_venta.totaliva10.toFixed(2);
    },

    Iva10: state =>{
        state.detalle_venta.iva10 = 0;
        state.listaVentas.forEach(element => {
            state.detalle_venta.iva10 = (element.precioventa * element.cantidad)/11;
        });
        return state.cabecera_venta.iva10.toFixed(2);
    },

    Vuelto: state =>{
        state.vuelto = state.montoPago - state.cabecera_venta.total;
        return state.vuelto;
    }
};