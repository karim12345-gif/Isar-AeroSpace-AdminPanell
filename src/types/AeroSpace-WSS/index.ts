import { ThemeColor } from 'src/@core/layouts/types'

interface WebSocketLiveData {
  icon: string
  color: ThemeColor
  Velocity: number
  Altitude: number
  Temperature: number
  StatusMessage: string
  IsAscending: boolean
  IsActionRequired: boolean
}

interface SpectrumLiveStatusUIProps {
  data?: WebSocketLiveData
}

interface SpectrumLiveStatusUIActionProps {
  data?: WebSocketLiveData
  onActionClick: () => void
  isActionLoading: boolean
}

export type { WebSocketLiveData, SpectrumLiveStatusUIProps, SpectrumLiveStatusUIActionProps }
