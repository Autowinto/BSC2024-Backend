import type { FastifyInstance, FastifyReply } from 'fastify'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer } from '../../src/server'
import { prisma } from '../../src/prisma/client'

describe('smartPlugController', () => {
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
                name: "Test Device Measurement",
                expectedWattage: 100,
            }
        })

        await prisma.device.create({
            data: {
                name: "Test Device Measurement 2",
                expectedWattage: 100,
            }
        })

        await prisma.smartPlug.create({
            data: {
                name: 'Test Smartplug',
                id: "test-smartplug"
            }

        })
    })
    afterEach(async () => {

        await prisma.device.deleteMany({
            where: {
                name: "Test Device Measurement"
            }

        })

        await prisma.device.deleteMany({
            where: {
                name: "Test Device Measurement 2"
            }

        })

        await prisma.smartPlug.deleteMany({
            where: {
                id: "test-smartplug"
            }

        })
    })
    it('should return all smartplugs', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/smartplugs'
        })
        expect(response.statusCode).toBe(200)
        expect(response.json()).toBeInstanceOf(Array)
    })
    it('should return a smartplug by id', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/smartplugs/test-smartplug'
        })
        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject({
            id: "test-smartplug",
            name: "Test Smartplug"
        })
    })

    it('should return 404 if smartplug not found', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/smartplugs/unknown'
        })
        expect(response.statusCode).toBe(404)
    })

    it('should create a smartplug', async () => {
        await prisma.smartPlug.deleteMany({
            where: {
                id: "test-smartplug"
            }

        })

        const response = await server.inject({
            method: 'POST',
            url: '/smartplugs',
            payload: {
                id: "test-smartplug",
                name: "Test Smartplug"
            }
        })

        const smartplug = await prisma.smartPlug.findUnique({
            where: {
                id: "test-smartplug"
            }
        })

        if (!smartplug) {
            assert.fail('Smartplug not created')
        }

        expect(response.statusCode).toBe(201)
        expect(smartplug).toMatchObject({
            id: "test-smartplug",
            name: "Test Smartplug"
        })
    })

    it('should update a smartplug', async () => {
        const response = await server.inject({
            method: 'PUT',
            url: '/smartplugs',
            payload: {
                id: "test-smartplug",
                name: "Updated Smartplug"
            }
        })

        const smartplug = await prisma.smartPlug.findUnique({
            where: {
                id: "test-smartplug"
            }
        })

        if (!smartplug) {
            assert.fail('Smartplug not found')
        }

        expect(response.statusCode).toBe(200)
        expect(smartplug).toMatchObject({
            id: "test-smartplug",
            name: "Updated Smartplug"
        })
    })

    it('should return 404 if smartplug not found on PUT', async () => {
        const response = await server.inject({
            method: 'PUT',
            url: '/smartplugs',
            payload: {
                id: "unknown",
                name: "Updated Smartplug"
            }
        })

        expect(response.statusCode).toBe(404)
    })

    it('should assign a device to a smartplug', async () => {
        const device1 = await prisma.device.findUnique({
            where: {
                name: "Test Device Measurement"
            }
        })
        const device2 = await prisma.device.findUnique({
            where: {
                name: "Test Device Measurement 2"
            }
        })
        const smartplug = await prisma.smartPlug.findUnique({
            where: {
                id: "test-smartplug"
            }
        })

        if (!device1 || !device2 || !smartplug) {
            assert.fail('Device or Smartplug not found')
        }

        const response1 = await server.inject({
            method: 'PUT',
            url: '/smartplugs/assign',
            payload: {
                id: "test-smartplug",
                deviceId: device1.id
            }
        })

        expect(response1.statusCode).toBe(200)
        expect(response1.json()).toMatchObject({
            id: "test-smartplug",
            name: "Test Smartplug",
            deviceId: device1.id
        })

        const response2 = await server.inject({
            method: 'PUT',
            url: '/smartplugs/assign',
            payload: {
                id: "test-smartplug",
                deviceId: device2.id
            }
        })

        expect(response2.statusCode).toBe(200)
        expect(response2.json()).toMatchObject({
            id: "test-smartplug",
            name: "Test Smartplug",
            deviceId: device2.id
        })
    })

    it('should return 404 if smartplug not found on assign', async () => {
        const response = await server.inject({
            method: 'PUT',
            url: '/smartplugs/assign',
            payload: {
                id: "unknown",
                deviceId: "test-device"
            }
        })

        expect(response.statusCode).toBe(404)
    })
})
