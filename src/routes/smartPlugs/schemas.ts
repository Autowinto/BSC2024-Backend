import { Type } from '@fastify/type-provider-typebox'

const SmartPlug = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  powerReadingAreaId: Type.Number(),
  smartPlugMeasurements: Type.Array(Type.Any()),
  devices: Type.Array(Type.Any()),
})

export const GetSmartPlugsSchema = {
  tags: ['SmartPlug'],
  response: {
    200: Type.Array(SmartPlug),
  },
}

export const GetSmartPlugByIdSchema = {
  tags: ['SmartPlug'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: SmartPlug,
    404: Type.Array(Type.Any()),
  },
}
