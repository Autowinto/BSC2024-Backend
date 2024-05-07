import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { GetDeviceCategoriesSchema } from './schemas'
import deviceCategoriesController from '@/controllers/deviceCategories'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetDeviceCategoriesSchema }, deviceCategoriesController.get)
}
