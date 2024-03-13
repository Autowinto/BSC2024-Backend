import { prisma } from '@/prisma/client'

export default {
  getAppliances: async (request, reply) => {
    const appliances = await prisma.appliance.findMany()
    reply.send(appliances)
  },
}
