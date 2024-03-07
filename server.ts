import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { type TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import meteringPoints from 'wrappers/energinet/routes/meteringPoints'
import { prisma } from 'prisma/client'
import meterData from './wrappers/energinet/routes/meterData'
import metersRoutes from './routes/meters.routes'

// Routes

const fastify = Fastify({
  logger: true,
}).setValidatorCompiler(TypeBoxValidatorCompiler).withTypeProvider<TypeBoxTypeProvider>()

await fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Meterpreter API',
      description: 'Documentation of the Meterpreter API',
      version: '0.1',
    },

  },
})

// Move this to a function to make code prettier
async function syncMeters() {
  const meters = await meteringPoints.getMeteringPoints()

  for (const meter of meters) {
    const meterNumber = Number.parseInt(meter.meterNumber)
    await prisma.meter.upsert({
      where: { externalId: meterNumber },
      create: { name: meter.meterNumber, externalId: meterNumber },
      update: {},
    })
  }
}

await fastify.register(fastifySwaggerUI, {
  routePrefix: '/api',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
  staticCSP: true,
  transformStaticCSP: header => header,
  transformSpecificationClone: true,
})

fastify.register(metersRoutes, { prefix: 'meters' })
async function start() {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  }
  catch (err) {
    return fastify.log.error(err)
  }
}

await fastify.ready()
await start()
syncMeters()
