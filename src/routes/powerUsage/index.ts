import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import powerUsageController from '../../controllers/powerUsage'
import { GetPowerUsageSchema } from './schemas'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetPowerUsageSchema }, powerUsageController.get)
}
