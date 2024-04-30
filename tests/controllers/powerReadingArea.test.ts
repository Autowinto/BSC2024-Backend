import exp from 'node:constants'
import type { FastifyInstance, FastifyReply } from 'fastify'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer } from '../../src/server'
import { prisma } from '../../src/prisma/client'

describe('powerReadingAreaController', () => {
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
        name: 'Test Device Area',
        expectedWattage: 100,
        hoursActiveWeek: 10,
      },
    })

    await prisma.powerReadingArea.create({
      data: {
        name: 'Test Area',
        externalId: 'test-area',
      },
    })
  })
  afterEach(async () => {
    const device = await prisma.device.findUnique({
      where: {
        name: 'Test Device Area',
      },
    })

    if (!device)
      expect.fail('Device not found')

    await prisma.deviceOnArea.deleteMany({
      where: {
        deviceId: device.id,
      },
    })

    await prisma.device.deleteMany({
      where: {
        name: 'Test Device Area',
      },
    })

    await prisma.powerReadingArea.deleteMany({
      where: {
        name: 'Test Area',
      },
    })
  })
  /*
    it('should load all power reading areas', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/areas/load',
        })

        expect(response.statusCode).toBe(200)
    })
    */
  it('should return a list of all power reading areas', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/areas',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toBeInstanceOf(Array)
  })
  it('should delete a power reading area', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    const response = await server.inject({
      method: 'DELETE',
      url: '/areas',
      payload: {
        id: area?.id,
      },

    })

    const deletedArea = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    expect(deletedArea).toBeNull()
    expect(response.statusCode).toBe(200)
  })
  it('should return 404 if area not found', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: '/areas',
      payload: {
        id: 'unknown',
      },
    })

    expect(response.statusCode).toBe(404)
  })
  it('should get an area by id', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    const response = await server.inject({
      method: 'GET',
      url: `/areas/${area.id}`,
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toMatchObject({
      id: area.id,
      name: 'Test Area',
      externalId: 'test-area',
    })
  })

  it('should return 404 if area not found', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/areas/unknown',
    })

    expect(response.statusCode).toBe(404)
  })

  it('should update an area', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    const response = await server.inject({
      method: 'PUT',
      url: '/areas',
      payload: {
        id: area.id,
        name: 'Test Area',
        externalId: 'updated-area',
      },
    })

    const updatedArea = await prisma.powerReadingArea.findFirst({
      where: {
        id: area.id,
      },
    })

    expect(updatedArea).toMatchObject({
      id: area.id,
      name: 'Test Area',
      externalId: 'updated-area',
    })
    expect(response.statusCode).toBe(200)
  })

  it('should return 404 if area not found on update', async () => {
    const response = await server.inject({
      method: 'PUT',
      url: '/areas',
      payload: {
        id: 'unknown',
        name: 'Test Area',
        externalId: 'updated-area',
      },
    })

    expect(response.statusCode).toBe(404)
  })

  it('should add a device to an area', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    const device = await prisma.device.findFirst({
      where: {
        name: 'Test Device Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    if (!device)
      expect.fail('Device not found')

    const response = await server.inject({
      method: 'POST',
      url: '/areas/addDevice',
      payload: {
        areaId: area.id,
        deviceId: device.id,
        count: 1,
      },
    })

    const deviceOnArea = await prisma.deviceOnArea.findFirst({
      where: {
        areaId: area.id,
        deviceId: device.id,
      },
    })

    expect(deviceOnArea).toMatchObject({
      areaId: area.id,
      deviceId: device.id,
      count: 1,
    })
    expect(response.statusCode).toBe(200)
  })

  it('should return 404 if area or device not found on add device', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/areas/addDevice',
      payload: {
        areaId: 'unknown',
        deviceId: 'unknown',
        count: 1,
      },
    })

    expect(response.statusCode).toBe(404)
  })

  it('should return 400 if count is not provided on add device', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    const device = await prisma.device.findFirst({
      where: {
        name: 'Test Device Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    if (!device)
      expect.fail('Device not found')

    const response = await server.inject({
      method: 'POST',
      url: '/areas/addDevice',
      payload: {
        areaId: area.id,
        deviceId: device.id,
      },
    })

    expect(response.statusCode).toBe(400)
  })

  it('should update a device on an area', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    const device = await prisma.device.findFirst({
      where: {
        name: 'Test Device Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    if (!device)
      expect.fail('Device not found')

    await prisma.deviceOnArea.create({
      data: {
        areaId: area.id,
        deviceId: device.id,
        count: 1,
      },
    })

    const response = await server.inject({
      method: 'PUT',
      url: '/areas/updateDevice',
      payload: {
        areaId: area.id,
        deviceId: device.id,
        count: 2,
      },
    })

    const deviceOnArea = await prisma.deviceOnArea.findFirst({
      where: {
        areaId: area.id,
        deviceId: device.id,
      },
    })

    expect(deviceOnArea).toMatchObject({
      areaId: area.id,
      deviceId: device.id,
      count: 2,
    })
    expect(response.statusCode).toBe(200)
  })

  it('should return 404 if area or device not found on update device', async () => {
    const response = await server.inject({
      method: 'PUT',
      url: '/areas/updateDevice',
      payload: {
        areaId: 'unknown',
        deviceId: 'unknown',
        count: 1,
      },
    })

    expect(response.statusCode).toBe(404)
  })

  it('should return 400 if count is not provided on update device', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    const device = await prisma.device.findFirst({
      where: {
        name: 'Test Device Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    if (!device)
      expect.fail('Device not found')

    const response = await server.inject({
      method: 'PUT',
      url: '/areas/updateDevice',
      payload: {
        areaId: area.id,
        deviceId: device.id,
      },
    })

    expect(response.statusCode).toBe(400)
  })

  it('should delete a device from an area', async () => {
    const area = await prisma.powerReadingArea.findFirst({
      where: {
        name: 'Test Area',
      },
    })

    const device = await prisma.device.findFirst({
      where: {
        name: 'Test Device Area',
      },
    })

    if (!area)
      expect.fail('Area not found')

    if (!device)
      expect.fail('Device not found')

    await prisma.deviceOnArea.create({
      data: {
        areaId: area.id,
        deviceId: device.id,
        count: 1,
      },
    })

    const response = await server.inject({
      method: 'DELETE',
      url: '/areas/removeDevice',
      payload: {
        areaId: area.id,
        deviceId: device.id,
      },
    })

    const deviceOnArea = await prisma.deviceOnArea.findFirst({
      where: {
        areaId: area.id,
        deviceId: device.id,
      },
    })

    expect(deviceOnArea).toBeNull()
    expect(response.statusCode).toBe(200)
  })

  it('should return 404 if area or device not found on remove device', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: '/areas/removeDevice',
      payload: {
        areaId: 'unknown',
        deviceId: 'unknown',
      },
    })

    expect(response.statusCode).toBe(404)
  })
})
