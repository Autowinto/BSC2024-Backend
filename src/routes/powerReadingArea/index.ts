import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'

import { GetMeterByIdSchema, GetMetersSchema } from './schemas'
import metersController from '@/controllers/powerReadingArea'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()
  fastify.get('/', { schema: GetMetersSchema }, metersController.get)

  app.get('/:id', {
    schema: GetMeterByIdSchema,
  }, metersController.getById)
}
