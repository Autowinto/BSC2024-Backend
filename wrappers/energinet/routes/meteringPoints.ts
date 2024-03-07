import client from '../client'

interface GetMeteringPointsParameters {
  includeAll: boolean
}

interface MeteringPoint {
  streetCode: string
  streetName: string
  buildingNumber: string
  floorId: string | null
  roomId: string | null
  citySubDivisionName: string | null
  municipalityCode: string
  locationDescription: string | null
  settlementMethod: string
  meterReadingOccurrence: string
  firstConsumerPartyName: string
  secondConsumerPartyName: string | null
  meterNumber: string
  consumerStartDate: string
  meteringPointId: string
  typeOfMP: string
  balanceSupplierName: string
  postcode: string
  cityName: string
  hasRelation: boolean
  consumerCVR: string
  dataAccessCVR: string
  childMeteringPoints: string[]
}

export default {
  getMeteringPoints: async (params: GetMeteringPointsParameters = { includeAll: false }): Promise<MeteringPoint[]> => {
    return (await client.get('meteringpoints/meteringpoints', { params: { ...params } })).data.result
  },
}
