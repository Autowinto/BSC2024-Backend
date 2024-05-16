import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { AssignDeviceToSmartPlugSchema, CreateSmartPlugSchema, GetSmartPlugByIdSchema, GetSmartPlugsSchema, UpdateSmartPlugSchema } from './schemas'
import smartPlugsController from '@/controllers/smartPlug'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetSmartPlugsSchema }, smartPlugsController.get)

  app.get('/:id', { schema: GetSmartPlugByIdSchema }, smartPlugsController.getById)

  app.post('/', { schema: CreateSmartPlugSchema }, smartPlugsController.create)

  app.put('/:id', { schema: UpdateSmartPlugSchema }, smartPlugsController.update)

  app.put('/assign', { schema: AssignDeviceToSmartPlugSchema }, smartPlugsController.AssignDeviceToSmartPlug)
}
