import { Type } from '@fastify/type-provider-typebox'

export const Measurement = Type.Object({
  id: Type.String(),
  wattage: Type.Number(),
  timeMeasured: Type.Unsafe<Date>({ type: 'string', format: 'datetime', examples: ['2024-12-31 23:59:59'] }),
  deviceId: Type.String(),
},
)

export const GetMeasurementsSchema = {
  tags: ['Measurements'],
  response: {
    501: Type.Any(),
    200: Type.Array(Measurement),
  },
}

export const CreateMeasurementSchema = {
  tags: ['Measurements'],
  body: Type.Object({
    smartPlugId: Type.String(),
    wattage: Type.Number(),
  }),
  response: {
    201: Measurement,
    400: Type.String(),
    404: Type.String(),
  },
}
