import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifySecureSession from '@fastify/secure-session'
import fastifyPassport from '@fastify/passport'
import {Strategy} from 'passport-custom'
import { type TypeBoxTypeProvider, TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import metersRoutes from '@/routes/meters.routes'

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
  staticCSP: true,
  transformStaticCSP: header => header,
  transformSpecificationClone: true,
})

fastify.register(fastifySecureSession, {
  sessionName: 'meterpreter-session',
  cookieName: 'meterpreter-session-cookie',
  // This needs to be changed to be read from a file or to fail somehow if it doesn't exist. Currently unsecure
  key: process.env.SESSION_SECRET as string,
})
fastify.register(fastifyPassport.initialize())
fastify.register(fastifyPassport.secureSession())

// Strategy doesn't auth anything currently.
fastifyPassport.use('custom', new Strategy((req, done) => {
  done(null, {name: 'Some Username'})
}))

fastify.addHook('preValidation', (request, reply, done) => {
  fastifyPassport.authenticate('custom')
})


fastify.register(metersRoutes, { prefix: 'meters' })

await fastify.ready()

fastify.listen({ port: 3000, host: '0.0.0.0' }).catch((err) => {
  return fastify.log.error(err)
})
