import type { GetMeterByIdSchema, GetMetersSchema } from '../routes/schemas'
import type { FastifyRequestTypebox } from '../routes/types'

export default {
  getMeters: (request: FastifyRequestTypebox<typeof GetMetersSchema>) => {
    console.log(request.params)
    return { id: 1, name: 'Test Meter' }
  },

  getMeterById: (request: FastifyRequestTypebox<typeof GetMeterByIdSchema>) => {
    console.log(request.params)
    return { id: 1, name: 'Awooga' }
  },
}
