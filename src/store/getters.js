const getters = {
  cert: state => state.data[state.lang].cert,
  contact: state => state.data[state.lang].contact,
  dob: state => state.data[state.lang].dob,
  edu: state => state.data[state.lang].edu,
  gender: state => state.data[state.lang].gender,
  home: state => state.data[state.lang].home,
  job: state => state.data[state.lang].job,
  motto: state => state.data[state.lang].motto,
  name: state => state.data[state.lang].name,
  self: state => state.data[state.lang].self,
  skill: state => state.data[state.lang].skill,
  socio: state => state.data[state.lang].socio,
  talent: state => state.data[state.lang].talent
}
export default getters
