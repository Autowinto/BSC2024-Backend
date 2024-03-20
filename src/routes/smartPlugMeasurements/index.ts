import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyInstance } from 'fastify'
import smartPlugMeasurementControllers from '@/controllers/smartPlugMeasurements'

export default async (fastify: FastifyInstance) => {
    const app = fastify.withTypeProvider<TypeBoxTypeProvider>()

    app.post('/', smartPlugMeasurementControllers.create)
}
