import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema, GetMeasurementsSchema } from '@/routes/smartPlugMeasurements/schemas'

export default {
  get: async (_request: FastifyRequest, reply: FastifyTypeBoxReply<typeof GetMeasurementsSchema>) => {
    reply.status(501).send('Not Implemented')
  },
  create: async (
    request: FastifyTypeBoxRequest<typeof CreateMeasurementSchema>,
    reply: FastifyTypeBoxReply<typeof CreateMeasurementSchema>,
  ) => {
    const { body } = request

    const data = await prisma.smartPlugMeasurement.create({
      data: {
        wattage: body.wattage,
        timeMeasured: new Date(body.timeMeasured),
        smartPlugId: body.smartPlugId,
      },
    })

    reply.status(201).send(data)
  },
}
