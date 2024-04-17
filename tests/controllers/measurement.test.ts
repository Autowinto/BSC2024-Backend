/* eslint-disable test/prefer-lowercase-title */
import type { FastifyInstance, FastifyReply } from 'fastify'
import { Measurement } from '@prisma/client'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer } from '../../src/server'
import { prisma } from '../../src/prisma/client'
import measurementController from '@/controllers/measurement'
import deviceController from '@/controllers/device'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema } from '@/routes/measurements/schemas'

describe('Measurements API', () => {
    let server: FastifyInstance

    beforeAll(async () => {
        server = createServer()
        await server.ready()
    })

    afterAll(async () => {
        await server.close()
        await prisma.$disconnect()
    })

    afterEach(async () => {
        await prisma.measurement.deleteMany()
    })

    describe('GET /measurements', () => {
        it('should return an array of measurements', async () => {
            const testRequest = {
                body: {
                    timeMeasured: new Date().toISOString(),
                    wattage: 100,
                    deviceId: 'test-device-id', // replace with your actual device ID
                },
            }

            const testReply = {
                code: () => testReply, // mock the `code` method to return `testReply`
                send: (data: any) => data, // mock the `send` method to return the data it's called with
            }

            await measurementController.create(testRequest as FastifyTypeBoxRequest<typeof CreateMeasurementSchema>, testReply as unknown as FastifyTypeBoxReply<typeof CreateMeasurementSchema>)

            // Make a request to the endpoint
            const response = await server.inject({
                method: 'GET',
                url: '/measurements',
            })

            // Assert the response
            expect(response.statusCode).toBe(201)
            expect(response.json()).toEqual([
                { timeMeasured: testRequest.body.timeMeasured, wattage: testRequest.body.wattage, deviceId: testRequest.body.deviceId },
            ])
        })
    })
})
