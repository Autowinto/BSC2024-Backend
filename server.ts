import Fastify from 'fastify'
import { generateSwaggerDoc } from './generateSwagger'

const fastify = Fastify({
  logger: true,
})

fastify.get('/ping', async () => {
  return { ping: 'pong' }
})

async function start() {
  try {
    const outputFilePath = './documentation/swaggerDoc.yaml'
    generateSwaggerDoc(outputFilePath)
    return ('Swagger documentation generation initiated.')
  }
  catch (err) {
    fastify.log.error(err)
  }
  try {
    await fastify.listen({ port: 3000 })
  }
  catch (err) {
    fastify.log.error(err)
  }
}
start()

// sample route swagger documentation
/**
 * @swagger
 * /rates/favorites/{email}}:
 *   get:
 *     tags:
 *       - Rates
 *     summary: Get favorite currencies
 *     description: Get favorite currencies from favorites.json, given the user's email.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *         description: The email of the user.
 *     responses:
 *       '200':
 *         description: Data generated and returned.
 *       '500':
 *         description: Internal server error.
 */
