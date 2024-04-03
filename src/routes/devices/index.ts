import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { GetDevicesSchema } from './schemas'
import appliancesControllers from '@/controllers/device'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetDevicesSchema }, appliancesControllers.get)

  // app.post('/', appliancesControllers.createAppliance)
}
