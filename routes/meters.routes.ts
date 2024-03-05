import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'

import metersController from '../controllers/meters.controller'
import { GetMeterByIdSchema, GetMetersSchema } from './schemas'

export default async (fastify: FastifyInstance) => {
  // Might be a better way of doing this, but for now,
  // manually adding the type provider works fine
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()
  fastify.get('/', { schema: GetMetersSchema }, metersController.getMeters)

  app.get('/:id', {
    schema: GetMeterByIdSchema,
  }, metersController.getMeterById)
}
