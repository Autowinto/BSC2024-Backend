import { Type } from '@fastify/type-provider-typebox'

const PowerReadingArea = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  externalId: Type.Integer(),
})

export const GetPowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  response: {
    200: Type.Array(PowerReadingArea),
  },
}

export const GetMeterByIdSchema = {
  tags: ['PowerReadingArea'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: PowerReadingArea,
    404: Type.Array(Type.Any()),
  },
}
