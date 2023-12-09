// ** MUI Imports
import Grid from '@mui/material/Grid'
import { SpectrumLiveStream } from 'src/components'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <SpectrumLiveStream />
      </Grid>
    </Grid>
  )
}

export default Home
