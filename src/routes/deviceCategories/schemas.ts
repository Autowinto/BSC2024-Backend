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

export const CreateDeviceCategoriesSchema = {
  tags,
  description: 'Create a new device category',
  body: Type.Object({
    name: Type.String(),
  }),
  response: {
    201: DeviceCategory,
  },
}

export const UpdateDeviceCategoriesSchema = {
  tags,
  description: 'Update a device category',
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    name: Type.String(),
  }),
  response: {
    200: DeviceCategory,
  },
}

export const DeleteDeviceCategoriesSchema = {
  tags,
  description: 'Delete a device category',
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    204: Type.Any(),
  },
}
