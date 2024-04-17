import type { FastifyRequest } from 'fastify'
import type { Device } from '@prisma/client'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateDeviceSchema, GetDeviceByIdSchema, GetDeviceMeasurementsSchema, GetDevicesSchema, UpdateDeviceSchema } from '@/routes/devices/schemas'
import powerReadingAreaController from '@/controllers/powerReadingArea'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetDevicesSchema>, reply: FastifyTypeBoxReply<typeof GetDevicesSchema>) => {
    const data = await prisma.device.findMany()
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetDeviceByIdSchema>, reply: FastifyTypeBoxReply<typeof GetDeviceByIdSchema>) => {
    const data = await prisma.device.findFirst({ where: { id: request.params.id } })
    if (!data) {
      reply.code(404).send()
      return
    }
    const device = {
      Device: {
        id: data.id,
        name: data.name,
        description: data.description,
        expectedWattage: data.expectedWattage,
        measuredWattage: data.measuredWattage,
      },
    }

    reply.send(device)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateDeviceSchema>, reply: FastifyTypeBoxReply<typeof CreateDeviceSchema>) => {
    const { body } = request

    try {
      powerReadingAreaController.createCommonArea()
      const commonAreaId = await powerReadingAreaController.getIdByname('common-area')
      const data = await prisma.device.create({
        data: {
          name: body.name,
          description: body.description,
          expectedWattage: body.expectedWattage,
          powerReadingAreaId: commonAreaId,
        },
      })
      reply.code(201).send(data)
    }
    catch (error) {
      reply.code(400).send(error)
    }
  },

  getMeasurements: async (request: FastifyTypeBoxRequest<typeof GetDeviceMeasurementsSchema>, reply: FastifyTypeBoxReply<typeof GetDeviceMeasurementsSchema>) => {
    const data = await prisma.measurement.findMany({ where: { deviceId: request.params.id } })
    if (!data) {
      reply.code(404).send()
      return
    }
    reply.send({ measurements: data })
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdateDeviceSchema>, reply: FastifyTypeBoxReply<typeof UpdateDeviceSchema>) => {
    const { body } = request
    const data = await prisma.device.update({
      where: { id: request.params.id },
      data: {
        name: body.name,
        description: body.description,
        expectedWattage: body.expectedWattage,
      },
    })
    reply.send(data)
  },
}
