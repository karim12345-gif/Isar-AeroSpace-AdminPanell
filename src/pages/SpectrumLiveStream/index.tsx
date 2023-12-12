// ** MUI Imports
import Grid from '@mui/material/Grid'
import { SpectrumLiveStatusDashboardScreen } from 'src/components'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <SpectrumLiveStatusDashboardScreen />
      </Grid>
    </Grid>
  )
}

export default Home
