import { NextRouter, useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AeroSpaceController } from 'src/services/controllers'
import { WebSocketLiveData } from 'src/types'

// Context props
interface WebSocketContextProps {
  socket?: WebSocketLiveData
  isActionLoading: boolean
  isStatuesUpdated: boolean
  getSpectrumLiveData: () => void
  handelIsRequiredAction: () => void
}

// Create WebSocket context
const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined)

// Context provider
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocketLiveData | undefined>()
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [isStatuesUpdated, setIsStatuesUpdated] = useState(false)
  const socketRef = useRef<WebSocketLiveData>()

  //hooks
  //** Initializing Next.js router and AeroSpaceController
  const router: NextRouter = useRouter()

  /**
   * Handles fetching live data from the wss api
   */
  const getSpectrumLiveData = () => {
    try {
      const newSocket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS')

      newSocket.addEventListener('message', event => {
        const data = JSON.parse(event.data)

        // Update the data for the state
        setSocket({
          icon: 'ep:data-line',
          color: 'error',
          Velocity: data.Velocity,
          Altitude: data.Altitude,
          Temperature: data.Temperature,
          StatusMessage: data.StatusMessage,
          IsAscending: data.IsAscending,
          IsActionRequired: data.IsActionRequired
        })

        // If action is required === true close the socket connection
        if (data.IsActionRequired === true) {
          newSocket.close()

          // Show toast for action required

          handleActivation(data)

          return
        }

        // Receiving WebSocket data
        // handleActivation(data)
      })

      return () => {
        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close()
        }
      }
    } catch (error) {
      console.error('Error creating WebSocket:', error)
    }
  }

  //!! If isActivated is true and action is required, show a toast
  const handleActivation = (data: WebSocketLiveData) => {
    if (data?.IsActionRequired === true) {
      toast.success('Action is required!', {
        position: 'top-right',
        duration: 3000 // 5 seconds
      })
    } else {
      toast.error('Action is not required!', {
        position: 'top-right',
        duration: 2000 // 5 seconds
      })
    }
  }

  /**
   * Handles the WebSocket connection.
   * If there is an existing connection, sets IsActionRequired to false to prepare for a new process.
   * This prevents the existing connection from closing the new connection immediately.
   */
  const handleWebSocketConnection = () => {
    if (socketRef.current) {
      socketRef.current.IsActionRequired = false
    }

    // Create a new WebSocket connection by fetching the data again
    getSpectrumLiveData()
  }

  /**
   * Handles the fetching of the api that will be responsive for toggling the behavior of isRequired
   */
  const handelIsRequiredAction = async () => {
    setIsActionLoading(true)

    const statusResponse = await new AeroSpaceController(router).GetIsRequiredAction()

    if (statusResponse === 200) {
      setIsStatuesUpdated(true)
      toast.success('Action successfully completed!', { id: 'loading' })
    } else {
      setIsStatuesUpdated(false)
      toast.error('Action Unsuccessfully completed!', { id: 'loading' })
    }
    setIsActionLoading(false)

    handleWebSocketConnection()
  }

  useEffect(() => {
    getSpectrumLiveData()
  }, [isStatuesUpdated])

  const contextValue: WebSocketContextProps = {
    socket,
    isActionLoading,
    isStatuesUpdated,
    getSpectrumLiveData,
    handelIsRequiredAction
  }

  return <WebSocketContext.Provider value={contextValue}>{children}</WebSocketContext.Provider>
}

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }

  return context
}
