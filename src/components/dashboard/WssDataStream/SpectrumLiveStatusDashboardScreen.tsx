import { useEffect } from 'react'
import { Grid } from '@mui/material'
import SpectrumGaugesChart from './SpectrumGaugesChartLiveData'
import SpectrumHorizontalBarChartLiveData from './SpectrumHorizontalBarChartLiveData'
import SpectrumVerticalBarChartLiveData from './SpectrumVerticalBarChartLiveData'
import SpectrumLiveTextBoxLiveData from './SpectrumLiveTextBoxLiveData'
import { useWebSocket } from 'src/context/WebsocketContext'

const SpectrumLiveStatusDashboardScreen = () => {
  const { socket, isActionLoading, isStatuesUpdated, getSpectrumLiveData, handelIsRequiredAction } = useWebSocket()

  useEffect(() => {
    getSpectrumLiveData()
  }, [isStatuesUpdated])

  const renderCards = () => (
    <>
      <Grid item xs={12}>
        <SpectrumGaugesChart data={socket} />
      </Grid>

      <Grid item xs={12}>
        <SpectrumLiveTextBoxLiveData
          data={socket}
          onActionClick={handelIsRequiredAction}
          isActionLoading={isActionLoading}
        />
      </Grid>

      <SpectrumVerticalBarChartLiveData data={socket} />

      <Grid item xs={12}>
        <SpectrumHorizontalBarChartLiveData data={socket} />
      </Grid>
    </>
  )

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
    </Grid>
  )
}

export default SpectrumLiveStatusDashboardScreen
