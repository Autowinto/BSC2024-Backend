import client from '../client'

enum Aggregation {
  ACTUAL = 'actual',
  QUARTER = 'quarter',
  HOUR = 'hour',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

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
