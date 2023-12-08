interface GetSpectrumStatus {
  velocity: number
  altitude: number
  temperature: number
  statusMessage: string
  isAscending: boolean
  isActionRequired: boolean
}

export type { GetSpectrumStatus }
