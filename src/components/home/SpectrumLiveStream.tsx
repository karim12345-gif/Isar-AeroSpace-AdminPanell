import { useEffect, useState } from 'react'
import { GetSpectrumStatus } from 'src/types'

// ** Custom Component Import
import { ThemeColor } from 'src/@core/layouts/types'

export interface CardData {
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
const SpectrumLiveStream = () => {
  const [socket, setSocket] = useState<GetSpectrumStatus>()

  const getSpectrumLiveData = () => {
    try {
      const newSocket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS')

      newSocket.addEventListener('message', event => {
        console.log('WebSocket message received:', event.data)

        const data = JSON.parse(event.data)

        setSocket(data)

        // This piece of code is executed when the WebSocket component receives a message,
        // and the data.IsActionRequired property is true
        // then we inform the parent component
        if (data.IsActionRequired) {
          // Notify the parent component (SpectrumStatistics) about the action required
          // onActionRequiredUpdate(true)

          // Close the WebSocket connection
          newSocket.close()
        }
      })

      return () => {
        // Close the WebSocket connection when the component unmounts
        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close()
        }
      }
    } catch (error) {
      console.error('Error creating WebSocket:', error)
    }
  }

  useEffect(() => {
    getSpectrumLiveData()
  }, []) // empty dependency array to run effect only once on mount

  // Check if socket is of type GetSpectrumStatus before accessing its properties

  if (socket && 'Altitude' in socket) {
    console.log('socket Altitude:', socket.Altitude)
  }

  return <div>{/* Your component JSX */}</div>
}

export default SpectrumLiveStream
