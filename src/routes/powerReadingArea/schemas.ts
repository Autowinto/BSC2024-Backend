import { Type } from '@fastify/type-provider-typebox'
import { Collection, PaginationParams } from '../shared'

const tags = ['Power Reading Area']

export const PowerReadingArea = Type.Object({
  id: Type.String(),
  name: Type.Union([Type.String(), Type.Null()]),
  externalId: Type.String(),
})

export const GetPowerReadingAreaSchema = {
  tags,
  description: 'Returns all power reading areas',
  querystring: PaginationParams,
  response: {
    200: Collection(PowerReadingArea),
  },
}

export const GetPowerReadingAreaByIdSchema = {
  tags,
  description: 'Returns a power reading area by its id',
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: PowerReadingArea,
    404: Type.String(),
  },
}

export const LoadPowerReadingAreasSchema = {
  tags,
  description: 'Loads power reading areas from the Energinet API to the backend.',
  response: {
    200: Type.String(),
    400: Type.String(),
  },
}

export const UpdatePowerReadingAreaSchema = {
  tags,
  description: 'Update a power reading area. Any field explicitly set to null (field=null in body) will not be updated. This is NOT for devices in the area.',
  body: Type.Object({
    id: Type.String(),
    name: Type.Union([Type.String(), Type.Null()]),
    externalId: Type.Union([Type.String(), Type.Null()]),
  }),
  response: {
    200: PowerReadingArea,
    400: Type.String(),
    404: Type.String(),
  },
}

export const DeviceOnAreaSchema = {
  tags,
  body: Type.Object({
    count: Type.Number(),
    deviceId: Type.String(),
    areaId: Type.String(),
  }),
}

export const AddDeviceToAreaSchema = {
  tags,
  description: 'Add an existing device to an existing area.',
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
  tags,
  description: 'remove a device from an area. This will not delete the device or the area, just remove the relation.',
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
  tags,
  description: 'Update the count of a device in an area.',
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
  tags,
  description: 'Get all devices in an area.',
  params: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Collection(Type.Object({
      count: Type.Number(),
      deviceId: Type.String(),
      areaId: Type.String(),
    })),
    404: Type.String(),
  },
}

export const DeletePowerReadingAreaSchema = {
  tags,
  description: 'Deletes a power reading area from the backend.',
  body: Type.Object({
    id: Type.String(),
  }),
  response: {
    200: Type.String(),
    400: Type.String(),
    404: Type.String(),
  },
}
