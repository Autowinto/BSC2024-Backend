import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'

import { GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema } from './schemas'
import powerReadingAreaController from '@/controllers/powerReadingArea'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()
  fastify.get('/', { schema: GetPowerReadingAreaSchema }, powerReadingAreaController.get)

  app.get('/:id', {
    schema: GetPowerReadingAreaByIdSchema,
  }, powerReadingAreaController.getById)

  app.put('/:id', {
    schema: UpdatePowerReadingArea,
  })
}
