import type { Static } from '@fastify/type-provider-typebox'
import { Type } from '@fastify/type-provider-typebox'

export const Device = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  expectedWattage: Type.Number(),
  measuredWattage: Type.Number(),
  measurements: Type.Array(Type.Any()),
  smartPlug: Type.Any(),
})

export const GetDevicesSchema = {
  tags: ['Device'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Array(Device),
  },
}

export const GetDeviceByIdSchema = {
  tags: ['Device'],
  response: {
    200: Device,
    404: Type.Any(),
  },
}

export const CreateDeviceSchema = {
  tags: ['Device'],
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    expectedWattage: Type.Number(),
    measuredWattage: Type.Number(),
  }),
  response: {
    201: Device,
  },
}

export const UpdateDeviceSchema = {
  tags: ['Device'],
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    expectedWattage: Type.Number(),
    measuredWattage: Type.Number(),
    smartPlug: Type.Any(),
  }),
  response: {
    200: Device,
  },
}
