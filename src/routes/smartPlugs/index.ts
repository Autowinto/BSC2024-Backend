import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { CreateSmartPlugSchema, GetSmartPlugsSchema } from './schemas'
import smartPlugsController from '@/controllers/smartPlug'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetSmartPlugsSchema }, smartPlugsController.get)

  app.post('/', { schema: CreateSmartPlugSchema }, smartPlugsController.create)
}
