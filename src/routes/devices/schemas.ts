import { Type } from '@fastify/type-provider-typebox'

export const Device = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  measuredWattage: Type.Union([Type.Number(), Type.Null()]),
})

export const GetDevicesSchema = {
  tags: ['Device'],
  response: {
    200: Type.Array(Device),
  },
}

export const GetDeviceByIdSchema = {
  tags: ['Device'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      Device,
    }),
  },
  error: {
    404: Type.String(),
  },
}

export const CreateDeviceSchema = {
  tags: ['Device'],
  body: Type.Object({
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  }),
  response: {
    201: Device,
  },
}

export const UpdateDeviceSchema = {
  tags: ['Device'],
  body: Type.Object({
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    expectedWattage: Type.Union([Type.Number(), Type.Null()]),
    measuredWattage: Type.Union([Type.Number(), Type.Null()]),
  }),
  response: {
    200: Device,
  },
}



