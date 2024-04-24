import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'

import { AddDeviceToAreaSchema, CreatePowerReadingAreaSchema, GetDevicesInAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, RemoveDeviceFromAreaSchema, UpdateDeviceOnAreaSchema, UpdatePowerReadingAreaSchema } from './schemas'
import powerReadingAreaController from '@/controllers/powerReadingArea'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetPowerReadingAreaSchema }, powerReadingAreaController.get)

  app.get('/:id', {
    schema: GetPowerReadingAreaByIdSchema,
  }, powerReadingAreaController.getById)

  app.get('/:id/devices', {
    schema: GetDevicesInAreaSchema,
  }, powerReadingAreaController.GetDevicesInArea)

  app.post('/', { schema: CreatePowerReadingAreaSchema }, powerReadingAreaController.create)

  app.put('/', { schema: UpdatePowerReadingAreaSchema }, powerReadingAreaController.update)

  app.post('/addDevice', { schema: AddDeviceToAreaSchema }, powerReadingAreaController.AddDeviceToArea)

  app.delete('/removeDevice', {
    schema: RemoveDeviceFromAreaSchema,
  }, powerReadingAreaController.RemoveDeviceFromArea)

  app.put('/updateDevice', {
    schema: UpdateDeviceOnAreaSchema,
  }, powerReadingAreaController.UpdateDeviceOnArea)
}
