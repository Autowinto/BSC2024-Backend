import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import { GetSmartPlugsSchema } from './schemas'
import devicesController from '@/controllers/devices'
import { prisma } from '@/prisma/client'
import smartPlugMeasurementController from '@/controllers/smartPlugMeasurements'

export default async (fastify: FastifyInstance) => {
  const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

  app.get('/', { schema: GetSmartPlugsSchema }, smartPlugMeasurementController.get)
}
