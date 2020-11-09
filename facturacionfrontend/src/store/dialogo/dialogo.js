import Vue from 'vue';
import Vuex from 'vuex';

export const state= {
    dialog: false,
};
export const mutations= {
    UPDATE_MODAL(state, value){
        state.dialog = value;
    }
};
export const actions= {
    switchDialog({commit}, value){
        commit("UPDATE_MODAL", value);
    }
};
export const getters= {
    getModal: state => {
        return state.dialog;
      }
};