import Vue from 'vue'
import Vuex from 'vuex'
import { getCvData } from '@/utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'zh',
    data: {'zh': {'misc': null}, 'en': {'misc': null}}
  },
  getters: {
    basic: state => state.data[state.lang].basic,
    cert: state => state.data[state.lang].cert,
    contact: state => state.data[state.lang].contact,
    edu: state => state.data[state.lang].edu,
    job: state => state.data[state.lang].job,
    misc: state => state.data[state.lang].misc,
    self: state => state.data[state.lang].self,
    skill: state => state.data[state.lang].skill,
    socio: state => state.data[state.lang].socio,
    talent: state => state.data[state.lang].talent
  },
  mutations: {
    changeLang (state, lang) {
      state.lang = lang
    },
    getCv (state, payload) {
      const now = new Date()
      let dataExpired = true
      const validMinutes = process.env.NODE_ENV === 'development' ? 0 : 3600
      // fetch data from localStorage
      if (state.data.created) {
        if (validMinutes > 0) {
          const dataCreated = new Date(state.data.created)
          if (parseInt(now - dataCreated) <= validMinutes * 1000) {
            // state.data not expired
            dataExpired = false
          }
        }
      }
      if (dataExpired) {
        // payload = require('@/assets/cv.json')
        state.data = payload
        state.data.created = new Date()
        localStorage.setItem('myCv', JSON.stringify(state.data))
      } else {
        state.data = JSON.parse(localStorage.getItem('myCv'))
      }
    }
  },
  actions: {
    async fetchCv ({commit}) {
      commit('getCv', await getCvData())
    }
  },
  modules: {
  }
})
