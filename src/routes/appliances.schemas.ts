import { Type } from '@fastify/type-provider-typebox'

const Appliance = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  expectedWattage: Type.Optional(Type.Number()),
  measuringPointId: Type.Optional(Type.String()),
})

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
