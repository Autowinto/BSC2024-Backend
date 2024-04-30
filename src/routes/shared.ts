import type { TSchema } from '@fastify/type-provider-typebox'
import { Type } from '@fastify/type-provider-typebox'

export const PaginationParams = Type.Object({
  page: Type.Number({ default: 1 }),
  pageSize: Type.Number({ default: 10 }),
})

export function Collection(item: TSchema) {
  return Type.Object({
    totalItems: Type.Number(),
    items: Type.Array(item),
  })
}
