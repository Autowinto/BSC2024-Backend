import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { GetDevicesSchema } from '@/routes/devices/schemas'
import type { CreateMeasurementSchema } from '@/routes/smartPlugMeasurements/schemas'

export default {
  get: async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(501).send()
  },
  create: async (request: FastifyTypeBoxRequest<typeof CreateMeasurementSchema>, _reply: FastifyReply) => {
    console.log('request.body', request.body)
    const data = request.body
    const smartPlugId = data.smartPlugId
    const wattage = data.wattage
    const timeMeasured = data.timeMeasured

    await prisma.smartPlugMeasurements.create({
      data: {
        wattage,
        timeMeasured,
        smartPlug: {
          connect: {
            id: smartPlugId,
          },
        },
        smartPlugId,

      },
    })
  },
}
