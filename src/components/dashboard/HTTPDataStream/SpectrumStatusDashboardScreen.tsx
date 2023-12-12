// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GetSpectrumStatus } from "src/types";
import SpectrumStatusUI from "./SpectrumStatusUI";
import { NextRouter, useRouter } from "next/router";
import { AeroSpaceController } from "src/services/controllers";
import { Grid } from "@mui/material";

//** Main component for the Spectrum Status Dashboard
const SpectrumStatusDashboardScreen = () => {


  //**  States (variables for managing data and loading states)
  const [spectrumOverviewNumbers, setSpectrumOverviewNumbers] = useState<GetSpectrumStatus>();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isStatuesUpdated, setIsStatuesUpdated] = useState(false);

 //** Initializing Next.js router and AeroSpaceController
  const router: NextRouter = useRouter();
  const aeroSpaceController = new AeroSpaceController(router);
  
  // ** Function to handel the get spectrum data
  const getSpectrumStatusData = async () => {
    const response = await aeroSpaceController.GetSpectrumStatus();


    if (!response) return;

    setSpectrumOverviewNumbers(response);
  };

  //** Function to handle the required action
  const handleIsRequiredAction = async () => {
    setIsActionLoading(true);

    const statusResponse = await aeroSpaceController.GetIsRequiredAction();

    if (statusResponse === 200) {
      setIsStatuesUpdated(true);
      toast.success('Action successfully completed!', { id: 'loading' });
    } else {
      setIsStatuesUpdated(false);
      toast.error('Action Unsuccessfully completed!', { id: 'loading' });
    }
    setIsActionLoading(false);
  };

  //**Effect hook to fetch Spectrum Status data only when isStatuesUpdated changes
  useEffect(() => {

    getSpectrumStatusData();

    //**eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatuesUpdated]);

  //** Function to render SpectrumStatusData and SpectrumStatusUI components
  const renderCards = () => (
    <>
  
      {/* SpectrumStatusUI component */}
      <SpectrumStatusUI
        data={spectrumOverviewNumbers}
        onActionClick={handleIsRequiredAction}
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

export default SpectrumStatusDashboardScreen;
