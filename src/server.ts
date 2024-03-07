import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyPassport from '@fastify/passport'
import { type TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import meteringPoints from 'wrappers/energinet/routes/meteringPoints'
import { prisma } from 'prisma/client'
import metersRoutes from '@/routes/meters.routes'

// Routes

const fastify = Fastify({
  logger: true,
}).setValidatorCompiler(TypeBoxValidatorCompiler).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(helmet)
fastify.register(cors, {})

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

fastify.register(fastifyCookie)
fastify.register(fastifySession, { secret: '123456789123456789123456789123456789' })

fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

fastify.addHook('preValidation', (request, reply, done) => {
  console.log('Authenticating request...')
  done()
})
fastify.register(metersRoutes, { prefix: 'meters' })

export function testFunction(a: number, b: number): number {
  return a + b
}

await fastify.ready()
syncMeters()

fastify.listen({ port: 3000, host: '0.0.0.0' }).catch((err) => {
  return fastify.log.error(err)
})
