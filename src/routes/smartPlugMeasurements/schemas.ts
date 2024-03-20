import { Type } from '@fastify/type-provider-typebox'

const Measurement = Type.Object({
  id: Type.Integer(),
  wattage: Type.Number(),
  timeMeasured: Type.Unsafe<Date>({ type: 'string', format: 'datetime', examples: ['2024-12-31 23:59:59'] }),
  smartPlugId: Type.String({ examples: ['aooga'] }),
})

export const GetMeasurementsSchema = {
  tags: ['SmartPlugMeasurement'],
  response: {
    501: Type.Any(),
    200: Type.Array(Measurement),
  },
}

export const GetMeasurementByIdSchema = {
  tags: ['SmartPlugMeasurement'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: Measurement,
    404: Type.Array(Type.Any()),
  },
}

export const CreateMeasurementSchema = {
  tags: ['SmartPlugMeasurement'],
  body: Type.Object({
    timeMeasured: Type.String(),
    wattage: Type.Number(),
    smartPlugId: Type.String(),
  }),
  response: {
    201: Measurement,
  },
}
