import axios from 'axios'
import { apiUrl } from '../api'

export default function addBook (bookdata) {
  return axios.post(apiUrl + 'back/addbook', bookdata)
}
