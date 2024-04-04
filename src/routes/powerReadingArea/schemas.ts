import { Type } from '@fastify/type-provider-typebox'
import { Device } from '@/routes/devices/schemas'

const PowerReadingArea = Type.Object({
  id: Type.String(),
  name: Type.String(),
  externalId: Type.Integer(),
  devices: Type.Array(Device),
})

export const GetPowerReadingAreaSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          externalId: { type: 'number' },
        },
        required: ['id', 'name', 'externalId'],
      },
    },
  },
}

export const GetPowerReadingAreaByIdSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        externalId: { type: 'number' },
      },
      required: ['id', 'name', 'externalId'],
    },
  },
}

export const CreatePowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  body: Type.Object({
    name: Type.String(),
    externalId: Type.Integer(),
  }),
  response: {
    200: PowerReadingArea,
  },
}

export const UpdatePowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    name: Type.String(),
    externalId: Type.Integer(),
  }),
  response: {
    200: PowerReadingArea,
  },
}

export const GetDevicesInAreaSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Array(Device),
  },
}
