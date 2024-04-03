import type { FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply } from '@/routes/types'

export default {
  get: async (request: FastifyRequest, reply: FastifyTypeBoxReply) => {
    const data = await prisma.device.findMany()
    reply.send(data)
  },

  getById: async (request: FastifyRequest, reply: FastifyTypeBoxReply) => {
    const data = await prisma.device.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },

  create: async (request: FastifyRequest, reply: FastifyTypeBoxReply) => {
    const { body }: { body: any } = request
    await prisma.device.create({
      data: {
        name: body.name,
        description: body.description,
        expectedWattage: body.expectedWattage,
        powerReadingArea: body.powerReadingArea, // Add the powerReadingArea property
      },
    })
  },

}
