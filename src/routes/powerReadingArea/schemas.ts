import { Type } from '@fastify/type-provider-typebox'
import { Device } from '@/routes/devices/schemas'
import device from '@/controllers/device'

const PowerReadingArea = Type.Object({
  id: Type.String(),
  name: Type.String(),
  externalId: Type.Integer(),
})

export const GetPowerReadingAreaSchema = {
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

export const AddDeviceToAreaSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    deviceId: Type.String(),
  }),
  response: {
    200: 'Device added to area',
  },
}

export const RemoveDeviceFromAreaSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    deviceId: Type.String(),
  }),
  response: {
    200: 'Device removed from area',
  },
}
