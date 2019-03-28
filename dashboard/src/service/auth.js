import axios from 'axios'
export default function () {
  return axios.get('/api/back/islogin')
}

export var loginOut = function () {
  return axios.get('/api/back/loginout')
}

export var changePsd = function (data) {
  return axios.post('/api/back/changepsd', data)
}