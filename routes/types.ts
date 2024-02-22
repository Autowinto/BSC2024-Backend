import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { ContextConfigDefault, FastifyReply, FastifyRequest, FastifySchema, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteGenericInterface } from 'fastify'

export type FastifyRequestTypebox<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  TSchema,
  TypeBoxTypeProvider
>

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  TypeBoxTypeProvider
>
