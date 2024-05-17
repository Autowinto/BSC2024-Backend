import { prisma } from '@/prisma/dbClient'
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
    const { pageSize, page } = request.query
    const data = await prisma.deviceCategory.findMany({ take: pageSize, skip: pageSize * (page - 1), orderBy: { name: 'asc' } })
    const count = await prisma.deviceCategory.count()

    reply.send({ items: data, totalItems: count })
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
    const result = await prisma.deviceCategory.update({ where: { id }, data: { name: body.name } })
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
