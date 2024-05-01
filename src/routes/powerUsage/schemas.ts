import { Type } from '@fastify/type-provider-typebox'

const PowerUsage = Type.Object({
  measured: Type.Object({}),
  actual: Type.Object({}),
})

enum Aggregation {
  ACTUAL = 'actual',
  QUARTER = 'quarter',
  HOUR = 'hour',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export const GetPowerUsageSchema = {
  tags: ['PowerUsage'],
  description: 'Return the power usage of all devices',
  params: Type.Object({
    id: Type.Optional(Type.String({ description: 'The id of the metering point to get power usage data for. If none specified, all metering points are measured' })),
  }),
  querystring: Type.Object({
    dateFrom: Type.String({ format: 'date', examples: ['2024-12-31'] }),
    dateTo: Type.String({ format: 'date', examples: ['2024-12-31'] }),
    aggregation: Type.Enum(Aggregation),
  }),
}
