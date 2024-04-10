import { Type } from '@fastify/type-provider-typebox'

export const Measurement = Type.Object({
  id: Type.String(),
  wattage: Type.Number(),
  timeMeasured: Type.Unsafe<Date>({ type: 'string', format: 'datetime', examples: ['2024-12-31 23:59:59'] }),
  deviceId: Type.String({ examples: ['aooga'] }),
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
    id: Type.String(),
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
    deviceId: Type.String(),
  }),
  response: {
    201: Measurement,
  },
}
