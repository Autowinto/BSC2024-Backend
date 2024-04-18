import type { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/prisma/client'
import { AddDeviceToAreaSchema, CreatePowerReadingAreaSchema, GetDevicesInAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, RemoveDeviceFromAreaSchema, UpdatePowerReadingAreaSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import { connect } from 'http2'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.findMany({
    })
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaByIdSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({
      where: { id: request.params.id }
    })
    if (!data) {
      reply.code(404).send()
      return
    }

    reply.send(data)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof CreatePowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.create({
      data: request.body,
    })
    reply.send(data)
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdatePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof UpdatePowerReadingAreaSchema>) => {
    const { body } = request
    const area = await prisma.powerReadingArea.findFirst({ where: { id: body.id } })

    if (!area) {
      reply.code(404).send()
      return
    }

    let name: string | null = ""
    let externalId: number | null = null


    if (body.name) {
      name = body.name
    } else {
      name = area.name
    }

    if (body.externalId) {
      externalId = body.externalId
    } else {
      externalId = area.externalId
    }

    const data = await prisma.powerReadingArea.update({
      where: { id: body.id },
      data: {
        name: name,
        externalId: externalId,
      },
    })
    reply.send(data)
  },

  AddDeviceToArea: async (request: FastifyTypeBoxRequest<typeof AddDeviceToAreaSchema>, reply: FastifyTypeBoxReply<typeof AddDeviceToAreaSchema>) => {
    const { body } = request
    const addDeviceToArea = await prisma.powerReadingArea.update({
      where: { id: body.areaId },
      data: {
        Devices: {
          connect: { id: body.deviceId }
        }
      },
    })
  },

  RemoveDeviceFromArea: async (request: FastifyTypeBoxRequest<typeof RemoveDeviceFromAreaSchema>, reply: FastifyTypeBoxReply<typeof RemoveDeviceFromAreaSchema>) => {
    const { body } = request
    const removeDeviceFromArea = await prisma.powerReadingArea.update({
      where: { id: body.areaId },
      data: {
        Devices: {
          disconnect: { id: body.deviceId }
        }
      },
    })
  },

  GetDevicesInArea: async (request: FastifyTypeBoxRequest<typeof GetDevicesInAreaSchema>, reply: FastifyTypeBoxReply<typeof GetDevicesInAreaSchema>) => {
    const areaWithDevices = await prisma.powerReadingArea.findUnique({
      where: { id: request.params.areaId },
      include: { Devices: true }
    })

    if (!areaWithDevices) {
      reply.status(404).send()
      return
    }

    reply.send(areaWithDevices.Devices)
  },

}
