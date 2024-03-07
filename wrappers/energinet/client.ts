import axios from 'axios'
import { getAccessToken } from './auth'

const client = axios.create({ baseURL: 'https://api.eloverblik.dk/customerapi/api/' })

client.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await getAccessToken()}`

  return config
})

export default client
