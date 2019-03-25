import axios from 'axios'
export var getRoles = function () {
  return axios.get('/role/getroles')
}

export var addRole = function (config) {
  return axios.post('/role/addrole', config)
}

export var changeRole = function (config) {
  return axios.put('/role/changerole', config)
}
