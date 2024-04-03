import { Type } from '@fastify/type-provider-typebox'
import { Device } from '@/routes/devices/schemas'

const PowerReadingArea = Type.Object({
  id: Type.String(),
  name: Type.String(),
  externalId: Type.Integer(),
  devices: Type.Array(Type.Any()),
})

export const GetPowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  response: {
    200: Type.Array(PowerReadingArea),
  },
}

export const GetPowerReadingAreaByIdSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: PowerReadingArea,
    404: Type.Array(Type.Any()),
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

export const GetDevicesSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Array(Device),
  },
}
