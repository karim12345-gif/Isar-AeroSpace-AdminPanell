// Importing necessary dependencies and components
import { useEffect } from "react";

import SpectrumStatusUI from "./SpectrumStatusUI";

import { Grid } from "@mui/material";
import { useSpectrumStatus } from "src/context/SpectrumContext";

//** Main component for the Spectrum Status Dashboard
const SpectrumStatusDashboardScreen = () => {


  const { spectrumOverviewNumbers, isActionLoading, isStatuesUpdated, getSpectrumStatusData, handleIsRequiredAction } = useSpectrumStatus();



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
