import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

const fastify = Fastify({
  logger: true,
})

await fastify.register(fastifySwagger)

await fastify.register(fastifySwaggerUI, {
  routePrefix: '/api',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    // onRequest(request, reply, next) { next() },
    // preHandler(request, reply, next) { next() },
  },
  staticCSP: true,
  transformStaticCSP: header => header,
  transformSpecificationClone: true,
})

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
