import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { GetMeterByIdSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await prisma.powerReadingArea.findMany()
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetMeterByIdSchema>, reply: FastifyTypeBoxReply<typeof GetMeterByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },
}
