import axios from 'axios'

export default {
  getToken: async (): Promise<{ result: string }> => {
    return (await axios.get('/token', { baseURL: 'https://api.eloverblik.dk/customerapi/api/', headers: { Authorization: `Bearer ${process.env.ENERGINET_REFRESH_TOKEN}` } })).data
  },
}
