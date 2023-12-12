// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import { CardHeader, Grid, useTheme } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { SpectrumStatusUIProps } from 'src/types'

const SpectrumVerticalBarChart: React.FC<SpectrumStatusUIProps> = ({ data }) => {
  // ** Hooks
  const theme = useTheme()

  const temperatureData: number | undefined = data?.temperature ?? 0
  const altitudeData: number | undefined = data?.altitude ?? 0
  const velocityData: number | undefined = data?.velocity ?? 0

  const seriesData = [
    {
      name: 'Temperature',
      data: [data?.temperature ? temperatureData : null]
    },
    {
      name: 'Altitude',
      data: [data?.altitude ? altitudeData : null]
    },
    {
      name: 'Velocity',
      data: [data?.velocity ? velocityData : null]
    }
  ]

  //!! the chart options
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: `Spectrum Data`,
            headerCategory: 'Data',
            headerValue: 'Total Amount'
          }
        }
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    colors: [
      theme.palette.success.main, // Temperature color
      theme.palette.info.main, // Altitude color
      theme.palette.warning.main // Velocity color
    ],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '10%',
        columnWidth: '15%',
        horizontal: false,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled },
        formatter: (value: number, index: number) => {
          const formattedValue = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

          // Use different labels for each axis
          const axisLabels = ['%', '', '']
          const label = axisLabels[index] || ''

          return `${formattedValue} ${label}`
        }
      },
      title: {
        text: 'Spectrum Numbers',
        style: { color: theme.palette.text.secondary }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },

      categories: ['Temperature', 'Altitude', 'Velocity'],
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      title: {
        text: 'Status',
        style: { color: theme.palette.text.secondary }
      }
    },
    tooltip: {
      y: {
        // ** shows integer values with commas but without decimal places
        formatter: (value: number) => {
          return `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} `
        }
      }
    }
  }

  return (
    <Grid item xs={12} sx={{ mt: 3 }}>
      <Card>
        <CardHeader
          title='Spectrum Status Chart'
          subheader='This endpoint returns important sensor data, specifically the current velocity, altitude, temperature.'
          subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
        />
        {data ? (
          <CardContent>
            <ReactApexcharts type='bar' height={650} options={options} series={seriesData} />
          </CardContent>
        ) : (
          <div>Waiting for SpectrumWS api to connect...</div>
        )}
      </Card>
    </Grid>
  )
}

export default SpectrumVerticalBarChart
