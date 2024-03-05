import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { type TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
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

await fastify.register(fastifySwaggerUI, {
  routePrefix: '/api',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
  uiHooks: {
    // onRequest(request, reply, next) { next() },
    // preHandler(request, reply, next) { next() },
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

start()
