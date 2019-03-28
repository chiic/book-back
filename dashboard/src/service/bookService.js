import axios from 'axios'

/**
 *
 * @export
 * @param {*} bookdata: Object
 * @returns Promise
 */
export function addBook (bookdata) {
  return axios.post('/api/back/addbook', bookdata)
}

/**
 *
 * @export
 * @returns Promise
 */
export function bookList () {
  return axios.get('/api/back/booklist')
}

/**
 *
 * @export
 * @param {*} bookdata: Object
 * @returns Promise
 */
export function changeBook (bookdata) {
  return axios.put('/api/back/updatebook', bookdata)
}

/**
 *
 *
 * @export
 * @param {*} id: {id: String}
 * @returns
 */
export function removebook (id) {
  console.log(id)
  return axios.delete('/api/back/removebook', {params: { id }})
}

/**
 *
 *
 * @export
 * @param {*} _id
 * @returns
 */
export function getbook (_id) {
  return axios.get('/api/back/getbook', {params: { _id }})
}
