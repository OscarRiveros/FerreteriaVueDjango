
import axios from 'axios'
const URL_API = "http://127.0.0.1/api/pagos/"
const API_COMPRAS = "http://127.0.0.1/api/compras/"

export const state = {
    pagos: [],
    pago: {
        idpagos: "",
        montopago: "",
        fechapago: new Date().toISOString().substr(0, 10),
        numerofactura: "",
        compras_idcompras: "",
        nombreproveedor: "",

    },
    editar: false,
};
export const mutations = {
    SET_PAGOS(state, pagos) {
        state.pagos = pagos
    },
};
export const actions = {
    getPagos({ commit }) {
        console.log("Obteniendo Pagos")
        axios
            .get(URL_API)
            .then(result => result.data)
            .then(result => {
                commit('SET_PAGOS', result);
            });
    },
    insert_Pagos({ commit, dispatch }, compras) {
        console.log(compras)
        if (!state.editar) {
            axios
                .post(URL_API, state.pago)
                .then(() => {
                    dispatch("getPagos");
                }).catch((err) => {
                    console.log(err);
                });
            let saldo = compras.saldo - state.pago.montopago;
            console.log(saldo)
            axios({
                method: 'PUT',
                url: API_COMPRAS + compras.idcompras + '/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    numerodefactura: compras.numerodefactura,
                    fechacompra: compras.fechacompra,
                    total: compras.total,
                    estado: compras.estado,
                    proveedor_idproveedor: compras.proveedor_idproveedor,
                    saldo: saldo,
                },
            }).then((result)=>{
                dispatch("getCompra");
            })

        } else {
            console.log("actualizando datos", state.pago)
            axios({
                method: 'PUT',
                url: URL_API + state.pago.idpagos + '/',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    montopago: state.pago.montopago,
                    fechapago: state.pago.fechapago,
                    compras_idcompras: state.pago.compras_idcompras,
                },
            }).then(() => {
                axios
                    .get(URL_API)
                    .then(result => result.data)
                    .then(result => {
                        commit('SET_PAGOS', result);
                    });
            })
        }
    },
    eliminarPagos({ commit }) {
        axios
            .delete(URL_API + state.pago.idpagos + '/')
            .then(() => {
                axios
                    .get(URL_API)
                    .then((result) => {
                        commit('SET_PAGOS', result.data)
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err);
            });
    }
};
export const modules = {};