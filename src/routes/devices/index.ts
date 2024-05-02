import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { CreateDeviceSchema, DeleteDeviceSchema, GetDeviceByIdSchema, GetDevicesSchema, GetMeasurementsInIntervalSchema, GetMeasurementsSchema, UpdateDeviceSchema, UpdateMeasuredWattageSchema } from './schemas'
import deviceController from '@/controllers/device'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetDevicesSchema }, deviceController.get)
  app.get('/:id', { schema: GetDeviceByIdSchema }, deviceController.getById)
  app.get('/:deviceId/measurements', { schema: GetMeasurementsSchema }, deviceController.getMeasurements)
  app.post('/', { schema: CreateDeviceSchema }, deviceController.create)
  app.put('/', { schema: UpdateDeviceSchema }, deviceController.update)
  app.delete('/:id', { schema: DeleteDeviceSchema }, deviceController.deleteDevice)
  app.put('/updateMeasuredWattage', { schema: UpdateMeasuredWattageSchema }, deviceController.updateMeasuredWattage)
  app.get('/:deviceId/measurements/range', { schema: GetMeasurementsInIntervalSchema }, deviceController.getMeasurementsInInterval)
}
