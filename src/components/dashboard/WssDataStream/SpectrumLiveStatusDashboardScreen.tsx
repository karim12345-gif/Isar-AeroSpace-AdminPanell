// Importing necessary dependencies and components
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { WebSocketLiveData } from 'src/types'

import { NextRouter, useRouter } from 'next/router'
import { AeroSpaceController } from 'src/services/controllers'
import { Grid } from '@mui/material'
import SpectrumGaugesChart from './SpectrumGaugesChartLiveData'
import SpectrumHorizontalBarChartLiveData from './SpectrumHorizontalBarChartLiveData'
import SpectrumVerticalBarChartLiveData from './SpectrumVerticalBarChartLiveData'
import SpectrumLiveTextBoxLiveData from './SpectrumLiveTextBoxLiveData'

//** Main component for the Spectrum Status Dashboard
const SpectrumLiveStatusDashboardScreen = () => {
  // ** States
  const socketRef = useRef<WebSocketLiveData>()
  const [socket, setSocket] = useState<WebSocketLiveData | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [isStatuesUpdated, setIsStatuesUpdated] = useState(false)

  //** Initializing Next.js router and AeroSpaceController
  const router: NextRouter = useRouter()

  //!! If isActivated is true and action is required, show a toast
  const handleActivation = (data: WebSocketLiveData) => {
    if (data?.IsActionRequired === true) {
      toast.success('Action is required!', {
        position: 'top-right',
        duration: 5000 // 5 seconds
      })
    } else {
      toast.error('Action is not required!', {
        position: 'top-right',
        duration: 5000 // 5 seconds
      })
    }
  }

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
  }, [isStatuesUpdated]) // empty dependency array to run effect only once on mount

  //** Function to render SpectrumStatusData and SpectrumStatusUI components
  const renderCards = () => (
    <>
      <Grid item xs={12}>
        <SpectrumGaugesChart data={socket} />
      </Grid>

      {/* SpectrumStatusUI component */}
      <Grid item xs={12}>
        <SpectrumLiveTextBoxLiveData
          data={socket}
          onActionClick={handelIsRequiredAction}
          isActionLoading={isActionLoading}
        />
      </Grid>

      {/* Vertical bar chart Component */}
      <SpectrumVerticalBarChartLiveData data={socket} />

      {/*  Horizontal bar chart Component*/}
      <Grid item xs={12}>
        <SpectrumHorizontalBarChartLiveData data={socket} />
      </Grid>
    </>
  )

  //** Returning the main structure of the component
  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
    </Grid>
  )
}

export default SpectrumLiveStatusDashboardScreen
