import axios from 'axios'
export default function () {
  return axios.get('http://localhost:3001/api/back/islogin')
}
