import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    swaggerDefinition: {
        info: {
            title: 'Untitled-converter\'s API',
            version: '1.0.0',
            description: 'Documentation of the API routes for the "Untitled-converter" application.'
        }
    },
    apis: ['src/routes/**/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec