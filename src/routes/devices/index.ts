import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { CreateDeviceSchema, DeleteDeviceSchema, GetDeviceByIdSchema, GetDevicesInCategorySchema, GetDevicesSchema, GetMeasurementsInIntervalSchema, GetMeasurementsSchema, UpdateDeviceSchema, UpdateMeasuredWattageSchema } from './schemas'
import deviceController from '@/controllers/device'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetDevicesSchema }, deviceController.get)
  app.get('/:id', { schema: GetDeviceByIdSchema }, deviceController.getById)

  // TODO: Merge following two routes into one. Handle with parameters
  app.get('/:deviceId/measurements', { schema: GetMeasurementsSchema }, deviceController.getMeasurements)
  app.get('/:deviceId/measurements/range', { schema: GetMeasurementsInIntervalSchema }, deviceController.getMeasurementsInInterval)

  // TODO: Move this to deviceCategories such that route is /categories/:id/devices
  app.get('/categories/:categoryId', { schema: GetDevicesInCategorySchema }, deviceController.getDevicesInCategory)

  app.post('/', { schema: CreateDeviceSchema }, deviceController.create)

  app.put('/:id', { schema: UpdateDeviceSchema }, deviceController.update)

  // TODO: This should happen automatically upon a new measurement being added
  app.put('/updateMeasuredWattage', { schema: UpdateMeasuredWattageSchema }, deviceController.updateMeasuredWattage)

  app.delete('/:id', { schema: DeleteDeviceSchema }, deviceController.deleteDevice)
}
