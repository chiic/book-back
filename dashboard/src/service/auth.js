import axios from 'axios'
export default function () {
  return axios.get('/api/back/islogin')
}

export const loginOut = function () {
  return axios.get('/api/back/loginout')
}

export const changePsd = function (data) {
  return axios.post('/api/back/changepsd', data)
}
