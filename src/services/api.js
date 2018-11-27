import axios from 'axios'
import config from './configuration'

const api = axios.create({
  // set your server ip here
  baseURL: config.serverHost
})

export default api