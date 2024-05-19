import type {
  FastifyTypeBoxReply,
  FastifyTypeBoxRequest,
} from '../routes/types'
import { prisma } from '../prisma/dbClient'
import type {
  AssignDeviceToSmartPlugSchema,
  CreateSmartPlugSchema,
  GetSmartPlugByIdSchema,
  GetSmartPlugsSchema,
  UpdateSmartPlugSchema,
} from '../routes/smartPlugs/schemas'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetSmartPlugsSchema>, reply: FastifyTypeBoxReply<typeof GetSmartPlugsSchema>) => {
    const data = await prisma.smartPlug.findMany({ orderBy: { name: 'asc' } })
    const count = await prisma.smartPlug.count()
    reply.status(200).send({ items: data, totalItems: count })
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof CreateSmartPlugSchema>) => {
    const { body } = request

    // check if already exists a smartPlug with the same id
    const smartPlug = await prisma.smartPlug.findFirst({ where: { id: body.id } })
    if (smartPlug) {
      reply.code(200).send('SmartPlug already exists')
      return
    }

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
      reply.code(404).send('SmartPlug not found')
      return
    }

    reply.status(200).send(data)
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdateSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof UpdateSmartPlugSchema>) => {
    const { body } = request
    const { id } = request.params

    // Due to a bug in validation library, we need to check if deviceId is empty
    if (body.deviceId === '')
      body.deviceId = null

    try {
      const data = await prisma.smartPlug.update({
        where: { id },
        data: {
          name: body.name,
          deviceId: body.deviceId,
        },
      })
      reply.send(data)
    }
    catch (error) {
      reply.status(500).send(error.message)
    }
  },

  AssignDeviceToSmartPlug: async (request: FastifyTypeBoxRequest<typeof AssignDeviceToSmartPlugSchema>, reply: FastifyTypeBoxReply<typeof AssignDeviceToSmartPlugSchema>) => {
    const { body } = request

    // check if device exists
    if (body.deviceId != null) {
      const device = await prisma.device.findFirst({ where: { id: body.deviceId } })
      if (!device) {
        reply.code(404).send('Device not found')
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
      reply.code(404).send('SmartPlug not found')
    }
  },
}
