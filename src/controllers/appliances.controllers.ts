import type { FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply } from '@/routes/types'
import type { GetAppliancesSchema } from '@/routes/appliances.schemas'

export default {
  getAppliances: async (_request: FastifyRequest, reply: FastifyTypeBoxReply<typeof GetAppliancesSchema>) => {
    const data = await prisma.appliance.findMany()

    reply.send(data)
  },
}
