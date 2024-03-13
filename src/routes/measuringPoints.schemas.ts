import { Type } from '@fastify/type-provider-typebox'

const MeasuringPoint = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  meterId: Type.Number(),
  measurements: Type.Array(Type.Any()),
  appliances: Type.Array(Type.Any()),
})

export const GetMeasuringPointsSchema = {
  tags: ['MeasuringPoint'],
  response: {
    200: Type.Array(MeasuringPoint),
  },
}

export const GetMeasuringPointByIdSchema = {
  tags: ['MeasuringPoint'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: MeasuringPoint,
    404: Type.Array(Type.Any()),
  },
}
