import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  lang: 'zh',
  data: {}
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store
