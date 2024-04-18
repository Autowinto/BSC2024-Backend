import { Type } from '@fastify/type-provider-typebox'
import { Device } from '@/routes/devices/schemas'
import device from '@/controllers/device'

export const PowerReadingArea = Type.Object({
  id: Type.String(),
  name: Type.String(),
  externalId: Type.Integer(),
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
    400: Type.String(),
  },
}

export const UpdatePowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  body: Type.Object({
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    externalId: Type.Union([Type.Number(), Type.Null()])
  }),
  response: {
    200: PowerReadingArea,
  },
}

export const AddDeviceToAreaSchema = {
  tags: ['PowerReadingArea'],
  body: Type.Object({
    areaId: Type.String(),
    deviceId: Type.String(),
  }),
  response: {
    200: Type.Object({
      areaId: Type.String(),
      deviceId: Type.String(),
    }),
    404: Type.String(),


  },
}

export const RemoveDeviceFromAreaSchema = {
  tags: ['PowerReadingArea'],
  body: Type.Object({
    areaId: Type.String(),
    deviceId: Type.String(),
  }),
  response: {
    200: Type.String(),
    404: Type.String(),
  },
}

export const GetDevicesInAreaSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    areaId: Type.String(),
  }),
  response: {
    200: Type.Array(Device),
  },
}

