import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { GetMeterByIdSchema } from '@/routes/schemas'
import type { FastifyReplyTypebox, FastifyRequestTypebox } from '@/routes/types'

export default {
  getMeters: async (request: FastifyRequest, reply: FastifyReply) => {
    const meters = await prisma.meter.findMany()
    console.log(meters)
    reply.send(meters)
  },

  getMeterById: async (request: FastifsyRequestTypebox<typeof GetMeterByIdSchema>, reply: FastifyReplyTypebox<typeof GetMeterByIdSchema>) => {
    const data = await prisma.meter.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },
}
