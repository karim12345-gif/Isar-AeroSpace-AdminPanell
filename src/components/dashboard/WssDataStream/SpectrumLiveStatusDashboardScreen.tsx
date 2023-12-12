// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  WebSocketLiveData } from "src/types";

import { NextRouter, useRouter } from "next/router";
import { AeroSpaceController } from "src/services/controllers";
import { Grid } from "@mui/material";
import SpectrumLiveStatusUI from "./SpectrumLiveStatusUI";


//** Main component for the Spectrum Status Dashboard
const SpectrumLiveStatusDashboardScreen = () => {


   // ** States
   const [socket, setSocket] = useState<WebSocketLiveData | undefined>()
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [isActionLoading, setIsActionLoading] = useState(false)
   const [isStatuesUpdated, setIsStatuesUpdated] = useState(false)

 //** Initializing Next.js router and AeroSpaceController
  const router: NextRouter = useRouter();

  const handleActivation = (data: WebSocketLiveData) => {
    // If isActivated is true and action is required, show a toast
    if (data?.IsActionRequired === true) {
      toast.success('Action is required!', {
        position: 'top-right',
        duration: 5000 // 5 seconds
      })
    }
  }

  const getSpectrumLiveData = () => {
    try {
      const newSocket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS')

      newSocket.addEventListener('message', event => {
        const data = JSON.parse(event.data)



        //** this will udapte the data for our state  */
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

        // if action is required === true close the socket connection
        if (data.IsActionRequired === true) {
          newSocket.close()
          
          return
        }

        // receiving WebSocket data
        handleActivation(data)
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

  //* this function will be responsible for changing the is required status
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
  }

  useEffect(() => {
    getSpectrumLiveData()
  }, [isStatuesUpdated]) // empty dependency array to run effect only once on mount


  //** Function to render SpectrumStatusData and SpectrumStatusUI components
  const renderCards = () => (
    <>
  
      {/* SpectrumStatusUI component */}
      <SpectrumLiveStatusUI
        data={socket}
        onActionClick={handelIsRequiredAction}
        isActionLoading={isActionLoading}
      />
    </>
  );

  //** Returning the main structure of the component
  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
    </Grid>
  );
};

export default SpectrumLiveStatusDashboardScreen;
