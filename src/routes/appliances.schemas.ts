import type { Static } from '@fastify/type-provider-typebox'
import { Type } from '@fastify/type-provider-typebox'

const Appliance = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  expectedWattage: Type.Union([Type.Number(), Type.Null()]),
  measuringPointId: Type.Union([Type.String(), Type.Null()]),
})

export type AppliancesType = Static<typeof Appliance>

export const GetAppliancesSchema = {
  tags: ['Appliances'],
  response: {
    200: Type.Array(Appliance),
  },
}

export const GetApplianceByIdSchema = {
  tags: ['Appliances'],
  params: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    200: Appliance,
    404: Type.Array(Type.Any()),
  },
}

export const CreateApplianceSchema = {
  tags: ['Appliances'],
  body: Type.Object({
    id: Type.Integer(),
  }),
  response: {
    201: Appliance,
  },
}
