import type { TSchema } from '@fastify/type-provider-typebox'
import { Type } from '@fastify/type-provider-typebox'

export const PaginationParams = Type.Object({
  page: Type.Number(),
  pageSize: Type.Number(),
})

export function Collection(item: TSchema) {
  return Type.Object({
    totalItems: Type.Number(),
    items: Type.Array(item),
  })
}
