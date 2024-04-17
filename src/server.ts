import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifyPassport from '@fastify/passport'
import fastifyScalar from '@scalar/fastify-api-reference'
import { type TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import devicesRoutes from './routes/devices'
import measurementsRoutes from './routes/measurements'
import smartPlugsRoutes from './routes/smartPlugs'
import meteringPoints from '@/wrappers/energinet/routes/meteringPoints'
import { prisma } from '@/prisma/client'
import metersRoutes from '@/routes/powerReadingArea'

export function createServer() {
  const fastify = Fastify({
    logger: true,
  }).setValidatorCompiler(TypeBoxValidatorCompiler).withTypeProvider<TypeBoxTypeProvider>()

  fastify.register(helmet)
  fastify.register(cors, {})

  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Meterpreter API',
        description: 'Documentation of the Meterpreter API',
        version: '0.1',
      },
    },
  })

  fastify.register(fastifyScalar, {
    routePrefix: '/docs',
    configuration: {
      spec: {
        content: () => fastify.swagger(),
      },
    },
  })

  fastify.register(fastifyCookie)
  fastify.register(fastifySession, { secret: '123456789123456789123456789123456789' })

  fastify.register(fastifyPassport.initialize())
  fastify.register(fastifyPassport.secureSession())

  fastify.addHook('preValidation', (request, reply, done) => {
    done()
  })

  fastify.register(devicesRoutes, { prefix: 'devices' })
  fastify.register(measurementsRoutes, { prefix: 'measurements' })
  fastify.register(smartPlugsRoutes, { prefix: 'smartPlugs' })
  fastify.register(metersRoutes, { prefix: 'meters' })

  return fastify
}

export async function startServer() {
  const server = createServer()
  await server.ready()
  server.listen({ port: 3000, host: '0.0.0.0' }).catch((err) => {
    server.log.error(err)
  })
}

startServer()
