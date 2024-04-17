import { Type } from '@fastify/type-provider-typebox'
import { Measurement } from '@/routes/measurements/schemas'

export const Device = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  measuredWattage: Type.Union([Type.Number(), Type.Null()]),
  powerReadingAreaId: Type.String(),
})

export const DeviceMeasurements = Type.Object({
  measurements: Type.Union([Type.Array(Measurement), Type.Null()]),
})

export const GetDevicesSchema = {
  tags: ['Device'],
  response: {
    200: Type.Array(Device),
  },
}

export const GetDeviceByIdSchema = {
  tags: ['Device'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.Object({
      Device,
    }),
  },
  error: {
    404: Type.String(),
  },
}

export const GetDeviceMeasurementsSchema = {
  tags: ['Device'],
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: DeviceMeasurements,
  },
}

export const CreateDeviceSchema = {
  tags: ['Device'],
  body: Type.Object({
    name: Type.String(),
    description: Type.Union([Type.String(), Type.Null()]),
    expectedWattage: Type.Union([Type.Number(), Type.Null()]),
    powerReadingAreaId: Type.String(),
  }),
  response: {
    201: Device,
  },
}

export const UpdateDeviceSchema = {
  tags: ['Device'],
  params: Type.Object({
    id: Type.String(),
  }),
  body: Type.Object({
    name: Type.String(),
    description: Type.String(),
    expectedWattage: Type.Number(),
  }),
  response: {
    200: Device,
  },
}
