import { Type } from '@fastify/type-provider-typebox'

const PowerUsage = Type.Object({
  measured: Type.Object({}),
  actual: Type.Object({}),
})

enum Aggregation {
  ACTUAL = 'Actual',
  QUARTER = 'Quarter',
  HOUR = 'Hour',
  DAY = 'Day',
  MONTH = 'Month',
  YEAR = 'Year',
}

export const GetPowerUsageSchema = {
  tags: ['PowerUsage'],
  description: 'Return the power usage of all devices',
  querystring: Type.Object({
    dateFrom: Type.String({ format: 'date', examples: ['2024-12-31'] }),
    dateTo: Type.String({ format: 'date', examples: ['2024-12-31'] }),
    aggregation: Type.Enum(Aggregation),
  }),
}
