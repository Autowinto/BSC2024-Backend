import { prisma } from '../prisma/dbClient'
import meterData from '../wrappers/energinet/routes/meterData'
import type { GetPowerUsageSchema } from '../routes/powerUsage/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '../routes/types'

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

      const deviceHourlyAverages = await prisma.deviceHourlyAverage.findMany({
        where: {
          deviceId: {
            in: deviceIds,
          },
        },
      })

      const totalPowerUsage = deviceHourlyAverages.map((o: any) => o.wattage / 1000)

      internal.areas.push({
        id: area.id,
        data: totalPowerUsage,
      })
    }

    // Get all powerreadingareas
    // Get all devices in powerreadingareas
    // Get all deviceHourlyAverages for each device
    // Add these together to get the total power usage for the internal areas
    // add area to the internal object

    // const data: Array<any> = await prisma.deviceHourlyAverage.findMany({ where: { deviceId: request.params.deviceId } })
    // if (data === undefined || data.length === 0) {
    //   reply.status(404).send('Measurements not found')
    //   return
    // }
    // const wattages = []
    // for (let i = 0; i < data.length; i++)
    //   wattages.push(data[i].wattage)

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
    .map((o: any) => { return { id: o.mRID, data: o.Period[0].Point.map((p: any) => p['out_Quantity.quantity']) } })

  // const points: any[] = data.result[0].MyEnergyData_MarketDocument.TimeSeries[0].Period[0].Point
  // const dataPoints = points.map(o => o['out_Quantity.quantity'])
  return returnObject
}
