import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema } from '@/routes/measurements/schemas'

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

}
