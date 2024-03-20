import { Type } from '@fastify/type-provider-typebox'

const SmartPlug = Type.Object({
  id: Type.String(),
  name: Type.String(),
  powerReadingAreaId: Type.Number(),
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

export const CreateSmartPlugSchema = {
  tags: ['SmartPlug'],
  body: Type.Object({
    name: Type.String(),
    powerReadingAreaId: Type.Integer(),
  }),
  response: {
    201: SmartPlug,
  },
}
