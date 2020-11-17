import Vue from 'vue';
import Vuex from 'vuex';

export const state= {
    dialog: false,
    dialog2: false,
};
export const mutations= {
    UPDATE_MODAL(state, value){
        state.dialog = value;
    },
    UPDATE_MODAL2(state, value){
        state.dialog2 = value;
    }
};
export const actions= {
    switchDialog({commit}, value){
        commit("UPDATE_MODAL", value);
    },

    switchDialog2({commit}, value){
        commit("UPDATE_MODAL2", value);
    }
};
export const getters= {
    getModal: state => {
        return state.dialog;
      },

      getModal2: state => {
        return state.dialog2;
      }
};