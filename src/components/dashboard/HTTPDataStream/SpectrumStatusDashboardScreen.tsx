// Importing necessary dependencies and components
import { useEffect } from 'react'

import { Grid } from '@mui/material'
import { useSpectrumStatus } from 'src/context/SpectrumContext'
import SpectrumGaugesChart from './SpectrumGaugesChart'
import SpectrumVerticalBarChart from './SpectrumVerticalBarChart'
import SpectrumTextBox from './SpectrumTextBox'
import SpectrumHorizontalBarChart from './SpectrumHorizontalBarChart'

const SpectrumStatusDashboardScreen = () => {
  const { spectrumOverviewNumbers, isActionLoading, isStatuesUpdated, getSpectrumStatusData, handleIsRequiredAction } =
    useSpectrumStatus()

  //**Effect hook to fetch Spectrum Status data only when isStatuesUpdated changes
  useEffect(() => {
    getSpectrumStatusData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatuesUpdated])

  //** Function to render  SpectrumStatusUI components
  const renderCards = () => (
    <>
      {/* Components */}
      <Grid item xs={12}>
        <SpectrumGaugesChart data={spectrumOverviewNumbers} />
      </Grid>

      {/*  Text box bar chart*/}
      <Grid item xs={12}>
        <SpectrumTextBox
          data={spectrumOverviewNumbers}
          onActionClick={handleIsRequiredAction}
          isActionLoading={isActionLoading}
        />
      </Grid>

      {/*  Vertical bar chart*/}
      <Grid item xs={12}>
        <SpectrumVerticalBarChart data={spectrumOverviewNumbers} />
      </Grid>

      {/*  Horizontal  chart*/}
      <Grid item xs={12}>
        <SpectrumHorizontalBarChart data={spectrumOverviewNumbers} />
      </Grid>
    </>
  )

  //** Returning the main structure of the component
  return (
    <Grid container spacing={8} className='match-height'>
      {renderCards()}
    </Grid>
  )
}

export default SpectrumStatusDashboardScreen
