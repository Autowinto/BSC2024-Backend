import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import deviceCategoriesController from '../../controllers/deviceCategories'
import {
  CreateDeviceCategoriesSchema,
  DeleteDeviceCategoriesSchema,
  GetDeviceCategoriesSchema,
  UpdateDeviceCategoriesSchema,
} from './schemas'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetDeviceCategoriesSchema }, deviceCategoriesController.get)

  app.post('/', { schema: CreateDeviceCategoriesSchema }, deviceCategoriesController.create)

  app.put('/:id', { schema: UpdateDeviceCategoriesSchema }, deviceCategoriesController.update)

  app.delete('/:id', { schema: DeleteDeviceCategoriesSchema }, deviceCategoriesController.delete)
}
