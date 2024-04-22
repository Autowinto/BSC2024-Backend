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
  tags: ['Device'],
  description: "Return all devices",
  response: {
    200: Type.Array(Device),
  },
}

export const GetDeviceByIdSchema = {
  tags: ['Device'],
  description: "Return a device by its id",
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      Device,
    }),
    404: Type.String(),
  }
}

export const CreateDeviceSchema = {
  tags: ['Device'],
  description: "Create a new device. The expectedWattage and description are optional.",
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
  tags: ['Device'],
  description: "Update a device. Any field left explicitly as null (field=null in body) will not be updated.",
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
  tags: ['Device'],
  description: "Return all measurements for a device",
  params: Type.Object({
    deviceId: Type.String(),
  }),
  response: {
    200: Type.Array(Measurement),
    404: Type.String(),
  },
}

export const DeleteDeviceSchema = {
  tags: ['Device'],
  description: "Delete a device. All its measurements are also deleted, and it is automatically removed from any areas it is a part of.",
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.String(),
    404: Type.String(),
  },
}
