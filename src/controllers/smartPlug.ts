import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import { AssignDeviceToSmartPlugSchema, CreateSmartPlugSchema, GetSmartPlugByIdSchema, GetSmartPlugsSchema, UpdateSmartPlugSchema } from '@/routes/smartPlugs/schemas'
import { prisma } from '@/prisma/client'
import { i } from 'vitest/dist/reporters-MmQN-57K.js'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetSmartPlugsSchema>, reply: FastifyTypeBoxReply<typeof GetSmartPlugsSchema>) => {
    const data = await prisma.smartPlug.findMany()
    reply.status(200).send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof CreateSmartPlugSchema>) => {
    const { body } = request

    try {
      const data = await prisma.smartPlug.create({
        data: {
          id: body.id,
          name: body.name,
        },
      })
      reply.code(201).send(data)

    }
    catch (error) {
      reply.status(400).send(error)
    }

  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetSmartPlugByIdSchema>, reply: FastifyTypeBoxReply<typeof GetSmartPlugByIdSchema>) => {
    const data = await prisma.smartPlug.findFirst({ where: { id: request.params.id } })

    if (!data) {
      reply.code(404).send("SmartPlug not found")
      return
    }

    reply.status(200).send(data)
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdateSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof UpdateSmartPlugSchema>) => {
    const { body } = request
    try {
      const data = await prisma.smartPlug.update({
        where: { id: body.id },
        data: {
          name: body.name,
        },
      })
      reply.send(data)
    }
    catch (error) {
      reply.status(404).send("SmartPlug not found")
    }
  },

  AssignDeviceToSmartPlug: async (request: FastifyTypeBoxRequest<typeof AssignDeviceToSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof AssignDeviceToSmartPlugSchema>) => {
    const { body } = request

    //check if device exists
    if (body.deviceId != null) {
      const device = await prisma.device.findFirst({ where: { id: body.deviceId } })
      if (!device) {
        reply.code(404).send("Device not found")
        return
      }
    }

    try {
      const data = await prisma.smartPlug.update({
        where: { id: body.id },
        data: {
          deviceId: body.deviceId,
        },
      })
      reply.send(data)
    }
    catch (error) {
      reply.code(404).send("SmartPlug not found")
    }
  }
}
