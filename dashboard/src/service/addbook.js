import axios from 'axios'

export default function addBook (bookdata) {
  return axios.post('/api/back/addbook', bookdata)
}
