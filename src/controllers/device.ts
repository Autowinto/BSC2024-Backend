import type { Measurement } from '@prisma/client'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateDeviceSchema, DeleteDeviceSchema, GetDeviceByIdSchema, GetDevicesInCategorySchema, GetDevicesSchema, GetMeasurementsInIntervalSchema, GetMeasurementsSchema, UpdateDeviceSchema, UpdateMeasuredWattageSchema } from '@/routes/devices/schemas'
import type { CreateMeasurementSchema } from '@/routes/measurements/schemas'

interface QueryParams {
  start: string
  end: string
}

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetDevicesSchema>, reply: FastifyTypeBoxReply<typeof GetDevicesSchema>) => {
    const data = await prisma.device.findMany()
    const count = await prisma.device.count()

    reply.status(200).send({ totalItems: count, items: data })
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetDeviceByIdSchema>, reply: FastifyTypeBoxReply<typeof GetDeviceByIdSchema>) => {
    const data = await prisma.device.findFirst({ where: { id: request.params.id } })
    if (!data) {
      reply.code(404).send('Device not found')
      return
    }
    const device = {
      id: data.id,
      name: data.name,
      description: data.description,
      expectedWattage: data.expectedWattage,
      measuredWattage: data.measuredWattage,
      hoursActiveWeek: data.hoursActiveWeek,
      categoryId: data.categoryId,
    }

    reply.status(200).send(device)
  },
  create: async (request: FastifyTypeBoxRequest<typeof CreateDeviceSchema>, reply: FastifyTypeBoxReply<typeof CreateDeviceSchema>) => {
    const { body } = request

    try {
      const data = await prisma.device.create({
        data: {
          name: body.name,
          description: body.description,
          expectedWattage: body.expectedWattage,
          hoursActiveWeek: body.hoursActiveWeek,
          categoryId: body.categoryId,
        },
      })

      // create a DeviceHourlyAverage for each hour of the day
      for (let i = 0; i < 24; i++) {
        await prisma.deviceHourlyAverage.create({
          data: {
            deviceId: data.id,
            hour: i,
            wattage: 0,
          },
        })
      }
      reply.code(201).send(data)
    }

    catch (error) {
      reply.code(400).send(error)
    }
  },
  update: async (request: FastifyTypeBoxRequest<typeof UpdateDeviceSchema>, reply: FastifyTypeBoxReply<typeof UpdateDeviceSchema>) => {
    const { body } = request
    const { params } = request

    const device = await prisma.device.findFirst({ where: { id: params.id } })

    if (!device) {
      reply.code(404).send('Device not found')
      return
    }

    try {
      let name: string | null = ''
      let description: string | null = ''
      let expectedWattage: number | null = null
      let measuredWattage: number | null = null
      let hoursActiveWeek: number | null = null
      let categoryId: string | null = null

      if (body.name)
        name = body.name
      else
        name = device.name

      if (body.description)
        description = body.description
      else
        description = device.description

      if (body.expectedWattage)
        expectedWattage = body.expectedWattage
      else
        expectedWattage = device.expectedWattage

      if (body.measuredWattage)
        measuredWattage = body.measuredWattage
      else
        measuredWattage = device.measuredWattage

      if (body.hoursActiveWeek)
        hoursActiveWeek = body.hoursActiveWeek
      else
        hoursActiveWeek = device.hoursActiveWeek

      if (body.categoryId)
        categoryId = body.categoryId
      else
        categoryId = device.categoryId

      const data = await prisma.device.update({
        where: { id: params.id },
        data: {
          name,
          description,
          expectedWattage,
          measuredWattage,
          hoursActiveWeek,
          categoryId,
        },
      })
      reply.status(200).send(data)
    }
    catch (error) {
      reply.code(400).send(error)
    }
  },

  getDevicesInCategory: async (request: FastifyTypeBoxRequest<typeof GetDevicesInCategorySchema>, reply: FastifyTypeBoxReply<typeof GetDevicesSchema>) => {
    const data = await prisma.device.findMany({ where: { categoryId: request.params.categoryId } })
    reply.status(200).send({ items: data, totalItems: data.length })
  },

  getMeasurements: async (request: FastifyTypeBoxRequest<typeof GetMeasurementsSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementsSchema>) => {
    const data: Array<Measurement> = await prisma.measurement.findMany({ where: { deviceId: request.params.deviceId } })
    reply.status(200).send({ totalItems: data.length, items: data })
  },

  getMeasurementsInInterval: async (request: FastifyTypeBoxRequest<typeof GetMeasurementsInIntervalSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementsInIntervalSchema>) => {
    const { deviceId } = request.params
    const { start, end } = request.query as QueryParams
    const startDate = new Date(start)
    const endDate = new Date(end)

    const data: Array<Measurement> = await prisma.measurement.findMany({
      where: {
        deviceId,
        timeMeasured: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    if (data.length === 0) {
      reply.status(404).send('Measurements not found')
      return
    }

    reply.status(200).send(data)
  },

  updateMeasuredWattage: async (request: FastifyTypeBoxRequest<typeof UpdateMeasuredWattageSchema>, reply: FastifyTypeBoxReply<typeof UpdateMeasuredWattageSchema>) => {
    const { body } = request
    try {
      const device = await prisma.device.findFirst({ where: { id: body.id } })

      if (!device) {
        reply.code(404).send('Device not found')
        return
      }
      const measurements = await prisma.measurement.findMany({ where: { deviceId: body.id, wattage: { not: 0 } } })
      if (!measurements) {
        reply.code(404).send('Measurements not found')
        return
      }

      const measurementsWattageSum = measurements.reduce((sum, measurement) => sum + measurement.wattage, 0)
      const measurementsCount = measurements.length
      const averageWattage = measurementsCount > 0 ? measurementsWattageSum / measurementsCount : 0

      const data = await prisma.device.update({
        where: { id: body.id },
        data: {
          measuredWattage: averageWattage,
        },
      })
      reply.status(200).send(data)
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

  deleteDevice: async (request: FastifyTypeBoxRequest<typeof DeleteDeviceSchema>, reply: FastifyTypeBoxReply<typeof DeleteDeviceSchema>) => {
    const { id } = request.params

    const device = await prisma.device.findFirst({ where: { id } })

    if (!device) {
      reply.code(404).send('Device not found')
      return
    }

    await prisma.deviceOnArea.deleteMany({
      where: { deviceId: device.id },
    })

    await prisma.deviceHourlyAverage.deleteMany({
      where: { deviceId: id },
    })

    await prisma.measurement.deleteMany({
      where: { deviceId: device.id },
    })

    await prisma.device.delete({ where: { id } })

    reply.status(200).send('Device deleted successfully')
  },

}
