import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateSmartPlugSchema, GetSmartPlugsSchema } from '@/routes/smartPlugs/schemas'
import { prisma } from '@/prisma/client'

export default {
  get: async (
    _request: FastifyTypeBoxRequest<typeof GetSmartPlugsSchema>,
    reply: FastifyTypeBoxReply<typeof GetSmartPlugsSchema>,
  ) => {
    const data = await prisma.smartPlug.findMany()
    reply.send(data)
  },
  create: async (
    request: FastifyTypeBoxRequest<typeof CreateSmartPlugSchema>,
    reply: FastifyTypeBoxReply<typeof CreateSmartPlugSchema>,
  ) => {
    const { body } = request
    const data = await prisma.smartPlug.create({
      data: {
        id: body.id,
        name: body.name,
        powerReadingAreaId: body.powerReadingAreaId,
      },
    })

    reply.status(201).send(data)
  },
}
