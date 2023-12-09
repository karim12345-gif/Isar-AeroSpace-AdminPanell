// ** MUI Imports
import Grid from '@mui/material/Grid'
import { SpectrumStatusDashboard } from 'src/components'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <SpectrumStatusDashboard />
      </Grid>
    </Grid>
  )
}

export default Home
