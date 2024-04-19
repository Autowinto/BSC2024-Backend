import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema, GetMeasurementsSchema } from '@/routes/measurements/schemas'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetMeasurementsSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementsSchema>) => {
    const data = await prisma.measurement.findMany()
    reply.send(data)
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
      reply.code(400).send('SmartPlug/device not found')
      return
    }

    await prisma.measurement.create({
      data: {
        wattage: body.wattage,
        timeMeasured: new Date(),
        deviceId,
      },
    })
  },
}
