import { Type } from '@fastify/type-provider-typebox'
import { format, sub } from 'date-fns'
import { Collection } from '../shared'

const tags = ['Smart Plug Measurement']

export const Measurement = Type.Object({
  id: Type.String(),
  wattage: Type.Number(),
  timeMeasured: Type.Unsafe<Date>({ type: 'string', format: 'date-time', examples: ['2024-12-31 23:59:59'] }),
  deviceId: Type.String(),
},
)

export const GetMeasurementsSchema = {
  tags,
  description: 'Returns all measurements. Don\'t know what this would be used for tbh.',
  querystring: Type.Object({
    dateFrom: Type.Unsafe<Date>({ type: 'string', format: 'date-time', examples: ['2024-12-31 23:59:59'], default: format(sub(new Date(), { hours: 1 }), 'yyyy-MM-dd') }),
    dateTo: Type.Unsafe<Date>({ type: 'string', format: 'date-time', examples: ['2024-12-31 23:59:59'], default: format(new Date(), 'yyyy-MM-dd') }),
  }),
  response: {
    501: Type.Any(),
    200: Collection(Measurement),
  },
}

export const CreateMeasurementSchema = {
  tags,
  description: 'Create a new measurement. This must be done every time we receive a measurement from a smart plug.',
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
