import Fastify from 'fastify'
import { generateSwaggerDoc } from './generateSwagger'

const fastify = Fastify({
  logger: true,
})

fastify.get('/ping', async () => {
  return { ping: 'pong' }
})

fastify.get('/generate-swagger-doc', async (req, res) => {
  const outputFilePath = './documentation/swaggerDoc.yaml'
  generateSwaggerDoc(outputFilePath)
  return ('Swagger documentation generation initiated.')
})

try {
  await fastify.listen({ port: 3000 })
}
catch (err) {
  fastify.log.error(err)
}
