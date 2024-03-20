import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply } from '@/routes/types'
import type { GetDevicesSchema } from '@/routes/devices/schemas'

export default {
  get: async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(501).send()
  },
  create: async (_request: FastifyRequest, _reply: FastifyReply) => {

  },
}
