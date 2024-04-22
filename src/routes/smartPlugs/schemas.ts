import { Type } from '@fastify/type-provider-typebox'

export const SmartPlug = Type.Object({
  id: Type.String(),
  name: Type.String(),
  deviceId: Type.Union([Type.String(), Type.Null()]),
})

export const GetSmartPlugsSchema = {
  tags: ['SmartPlug'],
  response: {
    200: Type.Array(SmartPlug),
  },
}

export const GetSmartPlugByIdSchema = {
  tags: ['SmartPlug'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: SmartPlug,
    404: Type.String(),
  },
}

export const CreateSmartPlugSchema = {
  tags: ['SmartPlug'],
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
  tags: ['SmartPlug'],
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
  tags: ['SmartPlug'],
  body: Type.Object({
    deviceId: Type.Union([Type.String(), Type.Null()]),
    id: Type.String(),
  }),
  response: {
    200: SmartPlug,
    404: Type.String(),
  },
}
