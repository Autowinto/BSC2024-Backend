import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { CreatePowerReadingAreaSchema, GetDevicesInAreaSchema, GetPowerReadingAreaByIdSchema, UpdatePowerReadingAreaSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await prisma.powerReadingArea.findMany()
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaByIdSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreatePowerReadingAreaSchema>, _reply: FastifyTypeBoxReply<typeof CreatePowerReadingAreaSchema>) => {
    const { body } = request
    await prisma.powerReadingArea.create({
      data: {
        name: body.name,
        externalId: body.externalId,
      },
    })
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof UpdatePowerReadingAreaSchema>) => {
    const { body, params } = request
    const data = await prisma.powerReadingArea.findFirst({ where: { id: params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    await prisma.powerReadingArea.update({
      where: { id: params.id },
      data: {
        name: body.name,
        externalId: body.externalId,
      },
    })
  },

  getDevices: async (request: FastifyTypeBoxRequest<typeof GetDevicesInAreaSchema>, reply: FastifyTypeBoxReply<typeof GetDevicesInAreaSchema>) => {
    const data = await prisma.device.findMany({ where: { powerReadingAreaId: request.params.id } })
    reply.send(data)
  },
}
