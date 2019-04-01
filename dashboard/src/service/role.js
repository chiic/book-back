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
