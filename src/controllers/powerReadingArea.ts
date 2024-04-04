import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { CreatePowerReadingAreaSchema, GetDevicesInAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, UpdatePowerReadingAreaSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.findMany({
    })
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

  create: async (request: FastifyTypeBoxRequest<typeof CreatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof CreatePowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.create({
      data: request.body,
    })
    reply.send(data)
  },

}
