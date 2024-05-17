import client from '../client'

enum Aggregation {
  ACTUAL = 'Actual',
  QUARTER = 'Quarter',
  HOUR = 'Hour',
  DAY = 'Day',
  MONTH = 'Month',
  YEAR = 'Year',
}

interface GetTimeseriesParameters {
  aggregation: Aggregation
  dateFrom: string
  dateTo: string
}

interface GetTimeseriesBody {
  meteringPoints: string[]
}

export default {
  getTimeseries: async (params: GetTimeseriesParameters, body: GetTimeseriesBody) => {
    return await client.post(`/meterdata/gettimeseries/${params.dateFrom}/${params.dateTo}/${params.aggregation}`, {
      meteringPoints: {
        meteringPoint: body.meteringPoints,
      },
    })
  },
  getMeterReadings: () => {
  },
  getTimeseriesCSV: () => {

  },
}
