import client from '../client'

type Aggregation = 'Actual' | 'Year' | 'Quarter' | 'Month' | 'Day' | 'Hour'

interface GetTimeseriesParameters {
  aggregation: Aggregation
  dateFrom: string
  dateTo: string
}

export default {
  getTimeseries: async (params: GetTimeseriesParameters) => {
    return await client.post(`gettimeseries/${params.dateFrom}/${params.dateTo}/${params.aggregation}`)
  },
  getMeterReadings: () => {
  },
  getTimeseriesCSV: () => {

  },
}
