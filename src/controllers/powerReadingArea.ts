import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { AddDeviceToAreaSchema, CreatePowerReadingAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, UpdatePowerReadingAreaSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.findMany({
      select: {
        id: true,
        name: true,
        externalId: true,
        devices: {
          select: {
            id: true,
          },
        },
      },
    })
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaByIdSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({
      where: { id: request.params.id },
      select: {
        id: true,
        name: true,
        externalId: true,
        devices: {
          select: {
            id: true,
          },
        },
      },
    })
    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof CreatePowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.create({
      data: request.body,
    })
    reply.send(data)
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof UpdatePowerReadingAreaSchema>) => {
    const { id } = request.params
    const { body } = request
    const data = await prisma.powerReadingArea.update({
      where: {
        id,
      },
      data: body,
    })
    reply.send(data)
  },

  addDevice: async (request: FastifyTypeBoxRequest<typeof AddDeviceToAreaSchema>, reply: FastifyTypeBoxReply<typeof AddDeviceToAreaSchema>) => {
    const { id } = request.params
    const { deviceId } = request.body
    const data = await prisma.powerReadingArea.update({
      where: {
        id,
      },
      data: {
        devices: {
          connect: {
            id: deviceId,
          },
        },
      },
    })
    reply.send(data)
  },

  removeDevice: async (request: FastifyTypeBoxRequest<typeof AddDeviceToAreaSchema>, reply: FastifyTypeBoxReply<typeof AddDeviceToAreaSchema>) => {
    const { id } = request.params
    const { deviceId } = request.body
    const data = await prisma.powerReadingArea.update({
      where: {
        id,
      },
      data: {
        devices: {
          disconnect: {
            id: deviceId,
          },
        },
      },
    })
    reply.send(data)
  },
}
