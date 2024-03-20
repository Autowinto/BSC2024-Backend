import type { Static } from '@fastify/type-provider-typebox'
import { Type } from '@fastify/type-provider-typebox'

const Device = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  smartPlugId: Type.Union([Type.String(), Type.Null()]),
})

export type DevicesType = Static<typeof Device>

export const GetDevicesSchema = {
  tags: ['Devices'],
  response: {
    200: Type.Array(Device),
  },
}

export const GetDeviceByIdSchema = {
  tags: ['Devices'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: Device,
    404: Type.Array(Type.Any()),
  },
}

export const CreateDeviceSchema = {
  tags: ['Devices'],
  body: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    201: Device,
  },
}
