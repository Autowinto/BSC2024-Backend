import { connect } from 'node:http2'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import type { AddDeviceToAreaSchema, CreatePowerReadingAreaSchema, GetDevicesInAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, RemoveDeviceFromAreaSchema, UpdateDeviceOnAreaSchema, UpdatePowerReadingAreaSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.findMany({
    })
    reply.status(200).send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaByIdSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({
      where: { id: request.params.id },
    })
    if (!data) {
      reply.status(404).send('PowerReadingArea not found')
      return
    }

    reply.status(200).send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof CreatePowerReadingAreaSchema>) => {
    try {
      const data = await prisma.powerReadingArea.create({
        data: request.body,
      })
      reply.status(200).send(data)
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof UpdatePowerReadingAreaSchema>) => {
    const { body } = request
    const area = await prisma.powerReadingArea.findFirst({ where: { id: body.id } })

    if (!area) {
      reply.code(404).send('PowerReadingArea not found')
      return
    }

    try {
      let name: string | null = ''
      let externalId: number | null = null

      if (body.name)
        name = body.name
      else
        name = area.name

      if (body.externalId)
        externalId = body.externalId
      else
        externalId = area.externalId

      const data = await prisma.powerReadingArea.update({
        where: { id: body.id },
        data: {
          name,
          externalId,
        },
      })
      reply.send(data)
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

  AddDeviceToArea: async (request: FastifyTypeBoxRequest<typeof AddDeviceToAreaSchema>, reply: FastifyTypeBoxReply<typeof AddDeviceToAreaSchema>) => {
    const { body } = request

    const area = await prisma.powerReadingArea.findFirst({
      where: { id: body.areaId },
    })
    if (!area) {
      reply.status(404).send('Area not found')
      return
    }

    const device = await prisma.device.findFirst({
      where: { id: body.deviceId },
    })
    if (!device) {
      reply.status(404).send('Device not found')
      return
    }

    try {
      const addDeviceToArea = await prisma.deviceOnArea.create({
        data: {
          areaId: body.areaId,
          deviceId: body.deviceId,
          count: body.count,
        },
      })

      reply.status(200).send(addDeviceToArea)
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

  RemoveDeviceFromArea: async (request: FastifyTypeBoxRequest<typeof RemoveDeviceFromAreaSchema>, reply: FastifyTypeBoxReply<typeof RemoveDeviceFromAreaSchema>) => {
    const { body } = request

    const area = await prisma.powerReadingArea.findFirst({
      where: { id: body.areaId },
    })
    if (!area) {
      reply.status(404).send('Area not found')
      return
    }

    const device = await prisma.device.findFirst({
      where: { id: body.deviceId },
    })
    if (!device) {
      reply.status(404).send('Device not found')
      return
    }

    try {
      const removeDeviceFromArea = await prisma.deviceOnArea.delete({
        where: {
          deviceId_areaId: {
            deviceId: body.deviceId,
            areaId: body.areaId,
          },
        },
      })

      reply.status(200).send('Device removed from area successfully')
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

  UpdateDeviceOnArea: async (request: FastifyTypeBoxRequest<typeof UpdateDeviceOnAreaSchema>, reply: FastifyTypeBoxReply<typeof UpdateDeviceOnAreaSchema>) => {
    const { body } = request

    const area = await prisma.powerReadingArea.findFirst({
      where: { id: body.areaId },
    })
    if (!area) {
      reply.status(404).send('Area not found')
      return
    }

    const device = await prisma.device.findFirst({
      where: { id: body.deviceId },
    })
    if (!device) {
      reply.status(404).send('Device not found')
      return
    }

    try {
      await prisma.deviceOnArea.update({
        where: {
          deviceId_areaId: {
            deviceId: body.deviceId,
            areaId: body.areaId,
          },
        },
        data: {
          count: body.count,
        },
      },
      )
      reply.status(200).send({ count: request.body.count, deviceId: request.body.deviceId, areaId: request.body.areaId })
    }
    catch (err) {
      return reply.status(400).send(err)
    }
  },

  GetDevicesInArea: async (request: FastifyTypeBoxRequest<typeof GetDevicesInAreaSchema>, reply: FastifyTypeBoxReply<typeof GetDevicesInAreaSchema>) => {
    const areaWithDevices = await prisma.deviceOnArea.findMany({
      where: { areaId: request.params.id },
    })

    if (!areaWithDevices) {
      reply.status(404).send('No devices found in area')
      return
    }

    reply.status(200).send(areaWithDevices)
  },

}
