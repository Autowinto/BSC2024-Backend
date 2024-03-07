import { prisma } from '@/prisma/client'
import type { GetMeterByIdSchema } from '@/routes/schemas'
import type { FastifyReplyTypebox, FastifyRequestTypebox } from '@/routes/types'

export default {
  getMeters: async () => {
    ''
    return await prisma.meter.findMany()
  },

  getMeterById: async (request: FastifyRequestTypebox<typeof GetMeterByIdSchema>, reply: FastifyReplyTypebox<typeof GetMeterByIdSchema>) => {
    const data = await prisma.meter.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },
}
