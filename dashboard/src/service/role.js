import axios from 'axios'
export const getRoles = function () {
  return axios.get('/role/getroles')
}

export const addRole = function (config) {
  return axios.post('/role/addrole', config)
}

export const changeRole = function (config) {
  return axios.put('/role/changerole', config)
}

export const uploadUserImg = function (data) {
  return axios.post('/role/uploaduserimg', data)
}

export const getUserImg = function () {
  return axios.get('/role/getuserimg')
}

export const matchRoles = function (data) {
  return axios.post('/role/matchroles', data)
}

export const changeFaceauth = function (value) {
  return axios.post('/role/changeface', value)
}

export const getUserface = function () {
  return axios.get('/role/getface')
}

export const register = function (config) {
  return axios.post('/role/register', config)
}
