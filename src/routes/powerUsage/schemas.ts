import { Type } from '@fastify/type-provider-typebox'
import { format, subDays } from 'date-fns'

const tags = ['Power Usage']

const PowerUsage = Type.Object({
  internal: Type.Any(),
  external: Type.Any({}),
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
  tags,
  description: 'Return the power usage of all devices',
  querystring: Type.Object({
    dateFrom: Type.String({ format: 'date', examples: ['2024-12-31'], default: format(subDays(new Date(), 1), 'yyyy-MM-dd') }),
    dateTo: Type.String({ format: 'date', examples: ['2024-12-31'], default: format(new Date(), 'yyyy-MM-dd') }),
    aggregation: Type.Enum(Aggregation, { default: Aggregation.DAY }),
  }),
  response: {
    200: PowerUsage,
  },
}
