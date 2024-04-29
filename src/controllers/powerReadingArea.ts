import { prisma } from '@/prisma/client'
import type { AddDeviceToAreaSchema, DeletePowerReadingAreaSchema, GetDevicesInAreaSchema, GetPowerReadingAreaByIdSchema, GetPowerReadingAreaSchema, LoadPowerReadingAreaSchema, LoadPowerReadingAreasSchema, RemoveDeviceFromAreaSchema, UpdateDeviceOnAreaSchema, UpdatePowerReadingAreaSchema } from '@/routes/powerReadingArea/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import meteringPointsController from '@/wrappers/energinet/routes/meteringPoints'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaSchema>) => {
    const data = await prisma.powerReadingArea.findMany({
    })
    reply.status(200).send({ totalItems: data.length, items: data })
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetPowerReadingAreaByIdSchema>, reply: FastifyTypeBoxReply<typeof GetPowerReadingAreaByIdSchema>) => {
    const data = await prisma.powerReadingArea.findFirst({
      where: { id: request.params.id },
      select: {
        id: true,
        name: true,
        externalId: true,
      },
    })
    if (!data) {
      reply.status(404).send('PowerReadingArea not found')
      return
    }
    reply.status(200).send(data)
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
      let externalId: string | null = null

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

  LoadPowerReadingAreas: async (request: FastifyTypeBoxRequest<typeof LoadPowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof LoadPowerReadingAreasSchema>) => {
    // send request to src/wrappers/energinet/routes/meteringPoints.ts'
    try {
      const areas = await meteringPointsController.getMeteringPoints()
      for (const area of areas) {
        // check if metering point already exists
        const existingArea = await prisma.powerReadingArea.findFirst({
          where: { externalId: area.meteringPointId },
        })
        if (existingArea)
          continue

        let roomName: string | null = ''

        if (area.roomId === null)
          roomName = area.meteringPointId
        else
          roomName = area.roomId

        await prisma.powerReadingArea.create({
          data: {
            name: roomName,
            externalId: area.meteringPointId,
          },
        })
        reply.status(200).send('Areas loaded successfully')
      }
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

  DeletePowerReadingArea: async (request: FastifyTypeBoxRequest<typeof DeletePowerReadingAreaSchema>, reply: FastifyTypeBoxReply<typeof DeletePowerReadingAreaSchema>) => {
    const { body } = request

    const area = await prisma.powerReadingArea.findFirst({
      where: { id: body.id },
    })
    if (!area) {
      reply.status(404).send('Area not found')
      return
    }

    try {
      await prisma.deviceOnArea.deleteMany({
        where: { areaId: body.id },
      })
    }
    catch (error) {
      reply.status(400).send(error)
    }

    try {
      await prisma.powerReadingArea.delete({
        where: { id: body.id },
      })
      reply.status(200).send('Area deleted successfully')
    }
    catch (error) {
      reply.status(400).send(error)
    }
  },

}
