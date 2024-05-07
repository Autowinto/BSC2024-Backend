import { prisma } from '@/prisma/client'
import type { GetDeviceCategoriesSchema } from '@/routes/deviceCategories/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (
    request: FastifyTypeBoxRequest<typeof GetDeviceCategoriesSchema>,
    reply: FastifyTypeBoxReply<typeof GetDeviceCategoriesSchema>,
  ) => {
    const data = await prisma.deviceCategory.findMany()

    reply.send({ items: data, totalItems: data.length })
  },
}
