import type { FastifyInstance, FastifyReply } from 'fastify'
import { Measurement } from '@prisma/client'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createServer } from '../../src/server'
import { prisma } from '../../src/prisma/client'
import measurementController from '@/controllers/measurement'
import deviceController from '@/controllers/device'
import type { FastifyTypeBoxReply, FastifyTypeBoxRequest } from '@/routes/types'
import type { CreateMeasurementSchema } from '@/routes/measurements/schemas'