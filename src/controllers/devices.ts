import type { FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply } from '@/routes/types'
import type { GetDevicesSchema } from '@/routes/devices/schemas'

export default {
  get: async (_request: FastifyRequest, reply: FastifyTypeBoxReply<typeof GetDevicesSchema>) => {
    const data = await prisma.device.findMany()

    reply.send(data)
  },
}
