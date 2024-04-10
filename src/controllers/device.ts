import type { FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateDeviceSchema, GetDeviceByIdSchema, GetDeviceMeasurementsSchema, GetDevicesSchema, UpdateDeviceSchema } from '@/routes/devices/schemas'

export default {
  get: async (request: FastifyRequest, reply: FastifyTypeBoxReply<typeof GetDevicesSchema>) => {
    const data = await prisma.device.findMany()
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetDeviceByIdSchema>, reply: FastifyTypeBoxReply<typeof GetDeviceByIdSchema>) => {
    const data = await prisma.device.findFirst({ where: { id: request.params.id } })
    if (!data) {
      reply.code(404).send()
      return
    }
    reply.send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateDeviceSchema>, reply: FastifyTypeBoxReply<typeof CreateDeviceSchema>) => {
    const { body } = request
    const data = await prisma.device.create({
      data: {
        name: body.name,
        description: body.description,
        expectedWattage: body.expectedWattage,
      },
    })
    reply.code(201).send(data)
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
