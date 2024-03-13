import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { GetMeasuringPointsSchema } from './measuringPoints.schemas'
import appliancesControllers from '@/controllers/appliances.controllers'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetMeasuringPointsSchema }, appliancesControllers.getAppliances)
}
