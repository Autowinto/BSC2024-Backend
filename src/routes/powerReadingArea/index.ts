import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'

import { CreatePowerReadingAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, UpdatePowerReadingAreaSchema, AddDeviceToAreaSchema, RemoveDeviceFromAreaSchema, GetDevicesInAreaSchema, UpdateDeviceOnAreaSchema } from './schemas'
import powerReadingAreaController from '@/controllers/powerReadingArea'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetPowerReadingAreaSchema }, powerReadingAreaController.get)

  app.get('/:id', {
    schema: GetPowerReadingAreaByIdSchema,
  }, powerReadingAreaController.getById)

  app.post('/create', { schema: CreatePowerReadingAreaSchema }, powerReadingAreaController.create)

  app.put('/', { schema: UpdatePowerReadingAreaSchema }, powerReadingAreaController.update)

  app.post('/addDevice', { schema: AddDeviceToAreaSchema }, powerReadingAreaController.AddDeviceToArea)

  app.delete('/removeDevice', {
    schema: RemoveDeviceFromAreaSchema
  }, powerReadingAreaController.RemoveDeviceFromArea)

  app.get('/devices/:areaId', {
    schema: GetDevicesInAreaSchema
  }, powerReadingAreaController.GetDevicesInArea)

  app.put('/updateDevice', {
    schema: UpdateDeviceOnAreaSchema
  }, powerReadingAreaController.UpdateDeviceOnArea
  )
}
