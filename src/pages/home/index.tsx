// ** MUI Imports
import Grid from '@mui/material/Grid'
import { SpectrumChart, SpectrumStatusDashboard } from 'src/components'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <SpectrumStatusDashboard />
      </Grid>

      <Grid item xs={12}>
        <SpectrumChart />
      </Grid>
    </Grid>
  )
}

export default Home
