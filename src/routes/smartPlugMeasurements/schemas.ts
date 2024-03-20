import { Type } from '@fastify/type-provider-typebox'

const Measurement = Type.Object({
  id: Type.Integer(),
  wattage: Type.Number(),
  timeMeasured: Type.String(),
})

export const GetMeasurementsSchema = {
  tags: ['Measurement'],
  response: {
    200: Type.Array(Measurement),
  },
}

export const GetMeasurementByIdSchema = {
  tags: ['Measurement'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: Measurement,
    404: Type.Array(Type.Any()),
  },
}

export const CreateMeasurementSchema = {
  tags: ['Measurement'],
  body: Type.Object({
    timeMeasured: Type.String(),
    wattage: Type.Number(),
    smartPlugId: Type.String(),
  }),
  response: {
    201: Measurement,
  },
}
