import { Type } from '@fastify/type-provider-typebox'

const Meter = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  externalId: Type.Integer(),
})

export const GetMetersSchema = {
  tags: ['Meters'],
  response: {
    200: Type.Array(Meter),
  },
}

export const GetMeterByIdSchema = {
  tags: ['Meters'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: Meter,
    404: Type.Array(Type.Any()),
  },
}
