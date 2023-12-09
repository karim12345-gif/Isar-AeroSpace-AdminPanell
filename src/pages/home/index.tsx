// ** MUI Imports
import Grid from '@mui/material/Grid'
import { SpectrumStatistics } from 'src/components'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <SpectrumStatistics />
      </Grid>
    </Grid>
  )
}

export default Home
