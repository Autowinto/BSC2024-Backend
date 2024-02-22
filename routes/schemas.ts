import { Type } from '@fastify/type-provider-typebox'

export const GetMetersSchema = {
  tags: ['Meters'],
  params: Type.Object({
    id: Type.Integer(),
  }),
}

export const GetMeterByIdSchema = {
  tags: ['Meters'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: Type.Object({
      id: Type.Integer(),
      name: Type.String(),
    }),
  },
}
