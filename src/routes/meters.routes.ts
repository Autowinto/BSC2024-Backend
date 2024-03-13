import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'

import { GetMeterByIdSchema, GetMetersSchema } from './meters.schemas'
import metersController from '@/controllers/meters.controller'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()
  fastify.get('/', { schema: GetMetersSchema }, metersController.getMeters)

  app.get('/:id', {
    schema: GetMeterByIdSchema,
  }, metersController.getMeterById)
}
