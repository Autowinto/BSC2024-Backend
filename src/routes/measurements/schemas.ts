import { Type } from '@fastify/type-provider-typebox'

export const Measurement = Type.Object({
  id: Type.String(),
  wattage: Type.Number(),
  timeMeasured: Type.Unsafe<Date>({ type: 'string', format: 'datetime', examples: ['2024-12-31 23:59:59'] }),
  deviceId: Type.String(),
},
)

export const GetMeasurementsSchema = {
  tags: ['SmartPlugMeasurement'],
  description: "Returns all measurements. Don't know what this would be used for tbh.",
  response: {
    501: Type.Any(),
    200: Type.Array(Measurement),
  },
}

export const CreateMeasurementSchema = {
  tags: ['SmartPlugMeasurement'],
  description: "Create a new measurement. This must be done every time we receive a measurement from a smart plug.",
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
