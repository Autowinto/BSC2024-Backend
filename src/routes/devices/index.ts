import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { CreateDeviceSchema, GetDeviceByIdSchema, GetDevicesSchema, UpdateDeviceSchema } from './schemas'
import deviceController from '@/controllers/device'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetDevicesSchema }, deviceController.get)

  app.get('/:id', { schema: GetDeviceByIdSchema }, deviceController.getById)

  app.post('/create', { schema: CreateDeviceSchema }, deviceController.create)

  app.put('/update', { schema: UpdateDeviceSchema }, deviceController.update)
}
