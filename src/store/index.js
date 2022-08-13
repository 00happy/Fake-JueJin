import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState({
    storage: sessionStorage,
    key: "vuex"
  })]//会自动保存创建的状态。刷新还在
})
export default store 
