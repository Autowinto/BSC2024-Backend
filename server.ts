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

fastify.get('/ping', async () => {
  return { ping: 'pong' }
})

fastify.get('/pongusdadsa', async () => {
  return { ping: 'pong' }
})

async function start() {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  }
  catch (err) {
    return fastify.log.error(err)
  }
}

fastify.put('/some-route/:id', {
  schema: {
    description: 'post some data',
    tags: ['user', 'code'],
    summary: 'qwerty',
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'user id',
        },
      },
    },
    body: {
      type: 'object',
      properties: {
        hello: { type: 'string' },
        obj: {
          type: 'object',
          properties: {
            some: { type: 'string' },
          },
        },
      },
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
      default: {
        description: 'Default response',
        type: 'object',
        properties: {
          foo: { type: 'string' },
        },
      },
    },
  },
}, (req, reply) => { })

await fastify.ready()

start()
