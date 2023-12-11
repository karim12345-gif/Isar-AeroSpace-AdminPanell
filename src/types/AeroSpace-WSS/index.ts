import { ThemeColor } from "src/@core/layouts/types"

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



  export type {WebSocketLiveData}
  