import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { GetAppliancesSchema } from './appliances.schemas'
import appliancesControllers from '@/controllers/appliances.controllers'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetAppliancesSchema }, appliancesControllers.getAppliances)

  // app.post('/', appliancesControllers.createAppliance)
}
