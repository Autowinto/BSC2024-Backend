import { prisma } from '@/prisma/client'
import type {
  CreateDeviceCategoriesSchema,
  DeleteDeviceCategoriesSchema,
  GetDeviceCategoriesSchema,
  UpdateDeviceCategoriesSchema,
} from '@/routes/deviceCategories/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (
    request: FastifyTypeBoxRequest<typeof GetDeviceCategoriesSchema>,
    reply: FastifyTypeBoxReply<typeof GetDeviceCategoriesSchema>,
  ) => {
    const data = await prisma.deviceCategory.findMany()

    reply.send({ items: data, totalItems: data.length })
  },

  create: async (
    request: FastifyTypeBoxRequest<typeof CreateDeviceCategoriesSchema>,
    reply: FastifyTypeBoxReply<typeof CreateDeviceCategoriesSchema>,
  ) => {
    const { body } = request
    const result = await prisma.deviceCategory.create({ data: body })
    reply.status(201).send(result)
  },

  update: async (
    request: FastifyTypeBoxRequest<typeof UpdateDeviceCategoriesSchema>,
    reply: FastifyTypeBoxReply<typeof UpdateDeviceCategoriesSchema>,
  ) => {
    const { body } = request
    const { id } = request.params
    const result = await prisma.deviceCategory.update({ where: { id }, data: body })
    reply.send(result)
  },

  delete: async (
    request: FastifyTypeBoxRequest<typeof DeleteDeviceCategoriesSchema>,
    reply: FastifyTypeBoxReply<typeof DeleteDeviceCategoriesSchema>,
  ) => {
    const { id } = request.params
    await prisma.deviceCategory.delete({ where: { id } })
    reply.status(204).send()
  },
}
