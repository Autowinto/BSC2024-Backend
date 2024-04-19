import type { FastifyRequest } from 'fastify'
import type { Device } from '@prisma/client'
import { prisma } from '@/prisma/client'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { type CreateDeviceSchema, DeleteDeviceSchema, type GetDeviceByIdSchema, type GetDevicesSchema, type GetMeasurementsSchema, type UpdateDeviceSchema } from '@/routes/devices/schemas'
import { PowerReadingArea } from '@/routes/powerReadingArea/schemas'
import powerReadingAreaController from '@/controllers/powerReadingArea'

export default {
  get: async (request: FastifyTypeBoxRequest<typeof GetDevicesSchema>, reply: FastifyTypeBoxReply<typeof GetDevicesSchema>) => {
    const data = await prisma.device.findMany()
    reply.send(data)
  },

  getById: async (request: FastifyTypeBoxRequest<typeof GetDeviceByIdSchema>, reply: FastifyTypeBoxReply<typeof GetDeviceByIdSchema>) => {
    const data = await prisma.device.findFirst({ where: { id: request.params.id } })
    if (!data) {
      reply.code(404).send()
      return
    }
    const device = {
      Device: {
        id: data.id,
        name: data.name,
        description: data.description,
        expectedWattage: data.expectedWattage,
        measuredWattage: data.measuredWattage,
      },
    }

    reply.send(device)
  },

  create: async (request: FastifyTypeBoxRequest<typeof CreateDeviceSchema>, reply: FastifyTypeBoxReply<typeof CreateDeviceSchema>) => {
    const { body } = request

    try {
      const data = await prisma.device.create({
        data: {
          name: body.name,
          description: body.description,
          expectedWattage: body.expectedWattage,
        },
      })
      reply.code(201).send(data)
    }
    catch (error) {
      reply.code(400).send(error)
    }
  },

  update: async (request: FastifyTypeBoxRequest<typeof UpdateDeviceSchema>, reply: FastifyTypeBoxReply<typeof UpdateDeviceSchema>) => {
    const { body } = request

    const device = await prisma.device.findFirst({ where: { id: body.id } })

    if (!device) {
      reply.code(404).send()
      return
    }

    let name: string | null = ''
    let description: string | null = ''
    // expected wattage is number or null
    let expectedWattage: number | null = null
    let measuredWattage: number | null = null

    if (body.name)
      name = body.name
    else
      name = device.name

    if (body.description)
      description = body.description
    else
      description = device.description

    if (body.expectedWattage)
      expectedWattage = body.expectedWattage
    else
      expectedWattage = device.expectedWattage

    if (body.measuredWattage)
      measuredWattage = body.measuredWattage
    else
      measuredWattage = device.measuredWattage

    const data = await prisma.device.update({
      where: { id: body.id },
      data: {
        name,
        description,
        expectedWattage,
        measuredWattage,
      },
    })
    reply.send(data)
  },

  getMeasurements: async (request: FastifyTypeBoxRequest<typeof GetMeasurementsSchema>, reply: FastifyTypeBoxReply<typeof GetMeasurementsSchema>) => {
    const data = await prisma.measurement.findMany({ where: { deviceId: request.params.deviceId } })
    if (!data) {
      reply.code(404).send()
      return
    }
    reply.send(data)
  },

  deleteDevice: async (request: FastifyTypeBoxRequest<typeof DeleteDeviceSchema>, reply: FastifyTypeBoxReply<typeof DeleteDeviceSchema>) => {
    const { id } = request.params

    const device = await prisma.device.findFirst({ where: { id } })

    if (!device) {
      reply.code(404).send()
      return
    }

    const powerReadingAreas = await prisma.powerReadingArea.findMany({
      where: { Devices: { some: { id } } },
    })

    for (const area of powerReadingAreas) {
      await powerReadingAreaController.RemoveDeviceFromArea({
        areaId: area.id,
        deviceId: id,
      },
      )
    }

    await prisma.device.delete({ where: { id } })
    reply.send()
  },
}
