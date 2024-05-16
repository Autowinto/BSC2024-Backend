import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema, GetMeasurementsSchema } from '@/routes/measurements/schemas'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetMeasurementsSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementsSchema>) => {
    const { dateFrom, dateTo } = request.query

    const data = await prisma.measurement.findMany({ orderBy: { timeMeasured: 'asc' } })
    const count = await prisma.measurement.count()
    reply.status(200).send({ items: data, totalItems: count })
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateMeasurementSchema>, reply: FastifyTypeBoxReply<typeof CreateMeasurementSchema>) => {
    const { body } = request

    let deviceId = ''
    let newMeasurement

    // find deviceId based on smartplugId
    const smartplug = await prisma.smartPlug.findFirst({
      where: {
        id: body.smartPlugId,
      },
      select: {
        deviceId: true,
      },
    })

    if (smartplug?.deviceId) {
      deviceId = smartplug.deviceId
    }
    else {
      reply.code(404).send('SmartPlug/device not found')
      return
    }

    try {
      newMeasurement = await prisma.measurement.create({
        data: {
          wattage: body.wattage,
          timeMeasured: new Date(),
          deviceId,
        },
      })

      const measurements = await prisma.measurement.findMany({ where: { deviceId: newMeasurement.deviceId, wattage: { not: 0 } } })
      if (!measurements) {
        reply.code(404).send('Measurements not found')
        return
      }

      const measurementsWattageSum = measurements.reduce((sum, measurement) => sum + measurement.wattage, 0)
      const measurementsCount = measurements.length
      const averageWattage = measurementsCount > 0 ? measurementsWattageSum / measurementsCount : 0

      await prisma.device.update({
        where: { id: deviceId },
        data: {
          measuredWattage: averageWattage,
        },
      })
    }
    catch (error) {
      reply.code(400).send(error)
    }

    if (!newMeasurement) {
      reply.code(404).send('Measurement not found')
      return
    }

    const currentHour: number = newMeasurement.timeMeasured.getHours()

    // get all measurements for the current hour and device

    const measurementsForDevice = await prisma.measurement.findMany({
      where: {
        deviceId,
      },
    })

    let measurementCount: number = 0
    let wattageSum: number = 0

    for (const measurement of measurementsForDevice) {
      const measurementHour: number = measurement.timeMeasured.getHours()
      if (measurementHour === currentHour) {
        measurementCount++
        wattageSum += measurement.wattage
      }
    }

    const averageWattage = wattageSum / measurementCount

    await prisma.deviceHourlyAverage.updateMany({
      where: {
        deviceId: newMeasurement.deviceId,
        hour: currentHour,
      },
      data: {
        wattage: averageWattage,
      },
    })

    reply.code(201).send(newMeasurement)
  },
}
