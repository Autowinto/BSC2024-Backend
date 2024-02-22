import { Type } from '@fastify/type-provider-typebox'

const Meter = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
})

export const GetMetersSchema = {
  tags: ['Meters'],
  response: {
    200: Type.Array(Type.Object(Meter)),
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
