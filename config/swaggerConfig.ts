import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  swaggerDefinition: {
    info: {
      title: 'Power Consumption API',
      description: 'Documentation of the API routes for the Power Consumption application.',
      version: '0.1',
      // TODO better title, description, maybe version
    },
  },
  apis: ['server.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
