import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 10000

axios.interceptors.response.use(function (response) {
  // response handling
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  // error handling
  return Promise.reject(error)
})

export function getCvData (url = 'static/cv.json') {
  return axios.get(url)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.error(err)
    })
}
