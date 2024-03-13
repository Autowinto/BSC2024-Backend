import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { GetMeasurementsSchema } from './measurements.schemas'
import appliancesControllers from '@/controllers/appliances.controllers'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetMeasurementsSchema }, appliancesControllers.getAppliances)
}
