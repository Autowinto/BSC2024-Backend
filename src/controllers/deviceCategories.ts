export default {
  get: async (
    request: FastifyTypeBoxRequest<typeof GetDeviceCategoriesSchema>,
    reply: FastifyTypeBoxReply<typeof GetDeviceCategoriesSchema>,
  ) => {
    const data = await prisma.deviceCategory.findMany()

    reply.send({ items: data, totalItems: data.length })
  },
}
