import Fastify from 'fastify'

const fastify = Fastify({
  logger: true,
})

fastify.get('/ping', async (request, response) => {
  return { ping: 'pong' }
})

try {
  await fastify.listen({ port: 3000 })
}
catch (err) {
  fastify.log.error(err)
}
