import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema, GetMeasurementByIdSchema } from '@/routes/measurements/schemas'

export default {
  get: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await prisma.device.findMany()
    reply.send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateMeasurementSchema>, _reply: FastifyReply) => {
    const { body } = request
    await prisma.measurement.create({
      data: {
        timeMeasured: new Date(body.timeMeasured),
        wattage: body.wattage,
        deviceId: body.deviceId,
      },
    })
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetMeasurementByIdSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementByIdSchema>) => {
    const data = await prisma.measurement.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },
}
