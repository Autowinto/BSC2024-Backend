import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema, GetMeasurementsSchema } from '@/routes/measurements/schemas'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetMeasurementsSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementsSchema>) => {
    const data = await prisma.measurement.findMany()
    reply.status(200).send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateMeasurementSchema>, reply: FastifyReply) => {
    const { body } = request

    let deviceId = ''

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
      await prisma.measurement.create({
        data: {
          wattage: body.wattage,
          timeMeasured: new Date(),
          deviceId,
        },
      })
    }
    catch (error) {
      reply.code(400).send(error)
    }

    reply.code(201).send('Measurement created')
  },
}
