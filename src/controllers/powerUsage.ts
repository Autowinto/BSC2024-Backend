import { prisma } from '@/prisma/client'
import meterData from '@/wrappers/energinet/routes/meterData'
import type { GetPowerUsageSchema } from '@/routes/powerUsage/schemas'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'

export default {
  get: async (
    request: FastifyTypeBoxRequest<typeof GetPowerUsageSchema>,
    reply: FastifyTypeBoxReply<typeof GetPowerUsageSchema>,
  ) => {
    const { dateFrom, dateTo, aggregation } = request.query

    const data = await meterData.getTimeseries({
      dateFrom,
      dateTo,
      aggregation,
    })

    reply.status(200).send(data)
  },
}
