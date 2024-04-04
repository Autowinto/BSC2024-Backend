import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateSmartPlugSchema, GetSmartPlugByIdSchema, GetSmartPlugsSchema, UpdateSmartPlugSchema } from '@/routes/smartPlugs/schemas'
import { prisma } from '@/prisma/client'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetSmartPlugsSchema>, reply: FastifyTypeBoxReply<typeof GetSmartPlugsSchema>) => {
    const data = await prisma.smartPlug.findMany()
    reply.send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof CreateSmartPlugSchema>) => {
    const { body } = request
    const data = await prisma.smartPlug.create({
      data: {
        id: body.id,
        name: body.name,
        deviceId: body.deviceId,
      },
    })
    reply.code(201).send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetSmartPlugByIdSchema>, reply: FastifyTypeBoxReply<typeof GetSmartPlugByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdateSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof UpdateSmartPlugSchema>) => {
    const { id } = request.params
    const { body } = request
    const data = await prisma.smartPlug.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        deviceId: body.deviceId,
      },
    })
    reply.send(data)
  },

}