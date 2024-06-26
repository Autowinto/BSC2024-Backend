import { Type } from '@fastify/type-provider-typebox'
import { format, subDays } from 'date-fns'

const tags = ['Power Usage']

const PowerUsageDataTransform = Type.Object({
  areas: Type.Array(Type.Object(
    {
      id: Type.String(),
      data: Type.Array(Type.Number()),
    },
  ),
  ),
})

const PowerUsage = Type.Object({
  internal: PowerUsageDataTransform,
  external: PowerUsageDataTransform,
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
    404: Type.Any(),
  },
}
