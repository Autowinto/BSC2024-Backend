import type { FastifyInstance, FastifyReply } from 'fastify'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer } from '../../src/server'
import { prisma } from '../../src/prisma/client'
describe('measurementController', () => {
    let server: FastifyInstance
    beforeAll(async () => {
        server = await createServer()
    })
    afterAll(async () => {
        await server.close()
    })
    beforeEach(async () => {
        await prisma.device.create({
            data: {
                name: 'Test Device Measurement',
                description: 'Test Description',
                expectedWattage: 100,
            },
        })

        const device = await prisma.device.findUnique({
            where: {
                name: 'Test Device Measurement',
            },
        })

        if (!device) {
            assert.fail('Device not found')
        }

        await prisma.smartPlug.create({
            data: {
                id: '1',
                name: 'Test Smartplug Measurement',
                deviceId: device.id
            },
        })

    })
    afterEach(async () => {

        const device = await prisma.device.findUnique({
            where: {
                name: 'Test Device Measurement',
            },
        })

        if (device) {
            await prisma.smartPlug.deleteMany({
                where: {
                    deviceId: device.id,
                },
            })
            await prisma.smartPlug.deleteMany({
                where: {
                    name: 'Test Smartplug Measurement',
                }
            })

            await prisma.measurement.deleteMany({
                where: {
                    deviceId: device.id,
                },
            })

            await prisma.device.deleteMany({
                where: {
                    id: device.id,
                },
            })
        }


    })

    it('should get all measurements', async () => {
        const device = await prisma.device.findUnique({
            where: {
                name: 'Test Device Measurement',
            },
        })

        if (!device) {
            assert.fail('Device not found')
        }


        const response = await server.inject({
            method: 'GET',
            url: '/measurements',
        })

        expect(response.statusCode).toBe(200)
    })

    it('should create a measurement', async () => {
        const device = await prisma.device.findUnique({
            where: {
                name: 'Test Device Measurement',
            },
        })

        const smartPlug = await prisma.smartPlug.findFirst({
            where: {
                name: 'Test Smartplug Measurement',
            },
        })

        if (!device) {
            assert.fail('Device not found')
        }

        if (!smartPlug) {
            assert.fail('SmartPlug not found')
        }

        const response = await server.inject({
            method: 'POST',
            url: '/measurements',
            payload: {
                smartPlugId: smartPlug.id,
                wattage: 100,
            },
        })

        const measurement = await prisma.measurement.findFirst({
            where: {
                deviceId: device.id,
            },
        })

        expect(measurement).toBeTruthy()
        expect(response.statusCode).toBe(201)
    })

    it('should not create a measurement if smartplug is not connected to a device', async () => {

        const smartPlug = await prisma.smartPlug.findFirst({
            where: {
                name: 'Test Smartplug Measurement',
            },
        })

        if (!smartPlug) {
            assert.fail('SmartPlug not found')
        }

        await prisma.smartPlug.update({
            where: {
                id: smartPlug?.id,
            },
            data: {
                deviceId: null,
            },
        })

        const response = await server.inject({
            method: 'POST',
            url: '/measurements',
            payload: {
                smartPlugId: smartPlug.id,
                wattage: 100,
            },
        })

        expect(response.statusCode).toBe(404)
    })
})
