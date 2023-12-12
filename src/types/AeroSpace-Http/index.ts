import { ThemeColor } from 'src/@core/layouts/types'

interface GetSpectrumStatus {
  velocity: number
  altitude: number
  temperature: number
  statusMessage: string
  isAscending: boolean
  isActionRequired: boolean
}

interface CardData {
  icon: string
  tooltip: string
  color: ThemeColor
  velocity: number
  altitude: number
  temperature: number
  statusMessage: string
  isAscending: boolean
  isActionRequired: boolean
}

interface SpectrumStatusUIProps {
  data?: GetSpectrumStatus
}

interface SpectrumStatusUIWithActionProps {
  data?: GetSpectrumStatus
  onActionClick: () => void
  isActionLoading: boolean
}
export type { GetSpectrumStatus, CardData, SpectrumStatusUIProps, SpectrumStatusUIWithActionProps }
