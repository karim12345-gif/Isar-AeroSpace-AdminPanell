// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import StatisticsCards from 'src/components/home/StatisticsCards'

const Home = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <StatisticsCards />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Kick start your project 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
            <Typography>
              Please make sure to read our Template Documentation to understand where to go from here and how to use our
              template.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
