import { Type } from '@fastify/type-provider-typebox'
import { Device } from '@/routes/devices/schemas'
import device from '@/controllers/device'

export const PowerReadingArea = Type.Object({
  id: Type.String(),
  name: Type.String(),
  externalId: Type.Integer(),
})

export const GetPowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "Returns all power reading areas",
  response: {
    200: Type.Array(PowerReadingArea),
  },
}

export const GetPowerReadingAreaByIdSchema = {
  tags: ['PowerReadingArea'],
  description: "Returns a power reading area by its id",
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: PowerReadingArea,
    404: Type.String(),
  },
}

export const CreatePowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "Create a new power reading area",
  body: Type.Object({
    name: Type.String(),
    externalId: Type.Integer(),
  }),
  response: {
    200: PowerReadingArea,
    400: Type.String(),
  },
}

export const UpdatePowerReadingAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "Update a power reading area. Any field explicitly set to null (field=null in body) will not be updated. This is NOT for devices in the area.",
  body: Type.Object({
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    externalId: Type.Union([Type.Number(), Type.Null()])
  }),
  response: {
    200: PowerReadingArea,
    400: Type.String(),
    404: Type.String(),
  },
}

export const DeviceOnAreaSchema = {
  tags: ['PowerReadingArea'],
  body: Type.Object({
    count: Type.Number(),
    deviceId: Type.String(),
    areaId: Type.String(),
  }),
}

export const AddDeviceToAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "Add an existing device to an existing area.",
  body: Type.Object({
    count: Type.Number(),
    areaId: Type.String(),
    deviceId: Type.String(),
  }),
  response: {
    200: Type.Object({
      count: Type.Number(),
      areaId: Type.String(),
      deviceId: Type.String(),
    }),
    400: Type.String(),
    404: Type.String(),

  },
}

export const RemoveDeviceFromAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "remove a device from an area. This will not delete the device or the area, just remove the relation.",
  body: Type.Object({
    areaId: Type.String(),
    deviceId: Type.String(),
  }),
  response: {
    200: Type.String(),
    400: Type.String(),
    404: Type.String(),
  },
}

export const UpdateDeviceOnAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "Update the count of a device in an area.",
  body: Type.Object({
    deviceId: Type.String(),
    areaId: Type.String(),
    count: Type.Number(),
  }),
  response: {
    200: Type.Object({
      deviceId: Type.String(),
      areaId: Type.String(),
      count: Type.Number(),
    }),
    404: Type.String(),
  },
}

export const GetDevicesInAreaSchema = {
  tags: ['PowerReadingArea'],
  description: "Get all devices in an area.",
  params: Type.Object({
    areaId: Type.String(),
  }),
  response: {
    200: Type.Array(Type.Object({
      count: Type.Number(),
      deviceId: Type.String(),
      areaId: Type.String(),
    })),
    404: Type.String(),
  },
}
