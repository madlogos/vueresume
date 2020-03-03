const mutations = {
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
}
export default mutations
