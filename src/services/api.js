import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENTRY_POINT
})

export default api