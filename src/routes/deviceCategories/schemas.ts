import { Type } from '@fastify/type-provider-typebox'
import { Collection } from '../shared'

const tags = ['Device Categories']
const DeviceCategory = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export const GetDeviceCategoriesSchema = {
  tags,
  description: 'Return all device categories',
  response: {
    200: Collection(
      DeviceCategory,
    ),
  },
}
