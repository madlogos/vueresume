const getters = {
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
}
export default getters
