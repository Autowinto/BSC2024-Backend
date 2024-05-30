import { prisma } from '../prisma/dbClient'
import type { GetPowerUsageSchema } from '../routes/powerUsage/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '../routes/types'
import meterData from '../wrappers/energinet/routes/meterData'

export default {
  get: async (
    request: FastifyTypeBoxRequest<typeof GetPowerUsageSchema>,
    reply: FastifyTypeBoxReply<typeof GetPowerUsageSchema>,
  ) => {
    const { dateFrom, dateTo, aggregation } = request.query

    const areas = await prisma.powerReadingArea.findMany()

    const external = await meterData.getTimeseries({
      dateFrom,
      dateTo,
      aggregation,
    }, {
      meteringPoints: areas.map((area: any) => area.externalId),
    })

    const internal: { areas: any[] } = { areas: [] }

    for (const area of areas) {
      const deviceOnAreas = await prisma.deviceOnArea.findMany({ where: { areaId: area.id } })
      const areaDeviceIds = deviceOnAreas.map((deviceOnArea: any) => deviceOnArea.deviceId)
      const devices = await prisma.device.findMany({ where: { id: { in: areaDeviceIds } } })
      const deviceIds = devices.map((device: any) => device.id)
      let totalPowerUsage: number[] = []
      for (const deviceId of deviceIds) {
        const deviceHourlyAverages: any = await prisma.deviceHourlyAverage.findMany({
          where: {
            deviceId,
          },
          orderBy: {
            hour: 'asc',
          },
        })

        const devicesCount = deviceOnAreas.find((o: any) => o.deviceId === deviceId)?.count || 1

        if (totalPowerUsage.length === 0) {
          totalPowerUsage = deviceHourlyAverages.map((o: any) => (o.wattage / 1000) * devicesCount)
          continue
        }

        totalPowerUsage = totalPowerUsage.map((value, index) => value + (deviceHourlyAverages[index]?.wattage / 1000 || 0))
      }

      if (totalPowerUsage.length === 0)
        totalPowerUsage = Array.from({ length: 24 }).fill(0) as number[]

      internal.areas.push({
        id: area.id,
        data: totalPowerUsage,
      })
    }

    const transformedData: any[] = transformTimeseriesData(external.data)
    reply.status(200).send(
      {
        external: { areas: transformedData },
        internal,
      },
    )
  },
}

function transformTimeseriesData(data: any) {
  const returnObject = data.result
    .map((o: any) => o.MyEnergyData_MarketDocument.TimeSeries[0])
    .map((o: any) => {
      return {
        id: o.mRID,
        data: o.Period.flatMap((p: any) => p.Point.map((pt: any) => pt['out_Quantity.quantity'])),
      }
    })

  return returnObject
}
