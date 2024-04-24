import { Type } from '@fastify/type-provider-typebox'
import { Measurement } from '../measurements/schemas'

export const Device = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  measuredWattage: Type.Union([Type.Number(), Type.Null()]),
})

export const GetDevicesSchema = {
  tags: ['Devices'],
  response: {
    200: Type.Array(Device),
  },
}

export const GetDeviceByIdSchema = {
  tags: ['Devices'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      Device,
    }),
    404: Type.String(),
  },
}

export const UpdateMeasuredWattageSchema = {
  tags: ['Devices'],
  description: 'Update the measured wattage of a device by averaging its measurements. ONLY includes values where wattage != 0',
  body: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Device,
    400: Type.String(),
    404: Type.String(),
  },
}

export const CreateDeviceSchema = {
  tags: ['Devices'],
  body: Type.Object({
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  }),
  response: {
    201: Device,
  },
}

export const UpdateDeviceSchema = {
  tags: ['Devices'],
  body: Type.Object({
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    description: Type.Union([Type.String(), Type.Null()]),
    expectedWattage: Type.Union([Type.Number(), Type.Null()]),
    measuredWattage: Type.Union([Type.Number(), Type.Null()]),
  }),
  response: {
    200: Device,
    400: Type.String(),
    404: Type.String(),
  },
}

export const GetMeasurementsSchema = {
  tags: ['Devices'],
  params: Type.Object({
    deviceId: Type.String(),
  }),
  response: {
    200: Type.Array(Measurement),
    404: Type.String(),
  },
}

export const DeleteDeviceSchema = {
  tags: ['Devices'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.String(),
    404: Type.String(),
  },
}
