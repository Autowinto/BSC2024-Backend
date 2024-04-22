import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { CreateMeasurementSchema, GetMeasurementsSchema } from './schemas'
import smartPlugMeasurementControllers from '@/controllers/measurement'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()
  app.get('/', { schema: GetMeasurementsSchema }, smartPlugMeasurementControllers.get)
  app.post('/', { schema: CreateMeasurementSchema }, smartPlugMeasurementControllers.create)
}
