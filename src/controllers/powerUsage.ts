import { prisma } from '@/prisma/client'
import meterData from '@/wrappers/energinet/routes/meterData'
import type { GetPowerUsageSchema } from '@/routes/powerUsage/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (
    request: FastifyTypeBoxRequest<typeof GetPowerUsageSchema>,
    reply: FastifyTypeBoxReply<typeof GetPowerUsageSchema>,
  ) => {
    const { dateFrom, dateTo, aggregation } = request.query

    const areas = await prisma.powerReadingArea.findMany()

    const data = await meterData.getTimeseries({
      dateFrom,
      dateTo,
      aggregation,
    }, {
      meteringPoints: areas.map(area => area.externalId),
    })

    const transformedData = transformTimeseriesData(data.data)
    reply.status(200).send(transformedData)
  },
  // getByArea: async (request: FastifyTypeBoxRequest<typeof G>)
}

function transformTimeseriesData(data: any) {
  const returnObject = data.result
    .map(o => o.MyEnergyData_MarketDocument.TimeSeries[0])
    .map((o) => { return { id: o.mRID, data: o.Period[0].Point.map(p => p['out_Quantity.quantity']) } })

  // const points: any[] = data.result[0].MyEnergyData_MarketDocument.TimeSeries[0].Period[0].Point
  // const dataPoints = points.map(o => o['out_Quantity.quantity'])
  return returnObject
}
