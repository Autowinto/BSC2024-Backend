import { Type } from '@fastify/type-provider-typebox'

const tags = ['Smart Plug']

export const SmartPlug = Type.Object({
  id: Type.String(),
  name: Type.String(),
  deviceId: Type.Union([Type.String(), Type.Null()]),
})

export const GetSmartPlugsSchema = {
  tags,
  description: 'Returns all smart plugs',
  response: {
    200: Type.Array(SmartPlug),
  },
}

export const GetSmartPlugByIdSchema = {
  tags,
  description: 'Returns a smart plug by its id',
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: SmartPlug,
    404: Type.String(),
  },
}

export const CreateSmartPlugSchema = {
  tags,
  description: 'Create a new smart plug. This should be done automatically when a new smart plug is added to the network.',
  body: Type.Object({
    id: Type.String(),
    name: Type.String(),
  }),
  response: {
    201: SmartPlug,
    400: Type.String(),
  },
}

export const UpdateSmartPlugSchema = {
  tags,
  description: 'Update a smart plug.',
  body: Type.Object({
    id: Type.String(),
    name: Type.String(),
  }),
  response: {
    200: SmartPlug,
    404: Type.String(),
  },
}

export const AssignDeviceToSmartPlugSchema = {
  tags,
  description: 'Assign a device to a smart plug. When this is done all measurements from the smartplug will be associated with the device.',
  body: Type.Object({
    deviceId: Type.Union([Type.String(), Type.Null()]),
    id: Type.String(),
  }),
  response: {
    200: SmartPlug,
    404: Type.String(),
  },
}
