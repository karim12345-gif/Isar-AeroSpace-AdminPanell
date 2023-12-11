// ** MUI Imports
import Grid from '@mui/material/Grid'
import {  SpectrumChart, SpectrumStatusDashboardScreen,  } from 'src/components'

const Home = () => {
  return (
    <Grid container spacing={8} className='match-height'>

      <Grid item xs={12}>
        <SpectrumChart />
      </Grid>
      <Grid item xs={12}>
        <SpectrumStatusDashboardScreen />
      </Grid>
    </Grid>
  )
}

export default Home
