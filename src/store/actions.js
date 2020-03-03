import { getCvData } from '@/utils/api'

const actions = {
  async fetchCv ({commit}) {
    let res = await getCvData()
    commit('getCv', res)
  }
}
export default actions
