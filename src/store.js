import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    actualSelectedAccount: {},
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_ACTUAL_ACCOUNT (state, payload) {
      state.actualSelectedAccount = payload
    },
  },
  actions: {

  },
  getters: {
    getActualSelectedAccount: state => {
      return state.actualSelectedAccount
    },
  },
})
