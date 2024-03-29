// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import { Typography, useTheme } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { ApexOptions } from 'apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { WebSocketLiveData } from 'src/types'

// ** interface that we will use to pass data from the dashboard component to the ui
interface SpectrumLiveStatusUIProps {
  data?: WebSocketLiveData
}

const SpectrumGaugesChart: React.FC<SpectrumLiveStatusUIProps> = ({ data }) => {
  // ** Hooks
  const theme = useTheme()

  //!! the chart options
  const createChartOptions = (data: number, color: string): ApexOptions => ({
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(color, 1)],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h4.fontSize as string
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: 15
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 200 }
        }
      },
      {
        breakpoint: 960,
        options: {
          chart: { height: 160 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { height: 190 }
        }
      },
      {
        breakpoint: 660,
        options: {
          chart: { height: 160 }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: { height: 150 }
        }
      },
      {
        breakpoint: 425,
        options: {
          chart: { height: 130 }
        }
      }
    ]
  })

  const temperatureOptions = createChartOptions(
    data?.Temperature || 0, // Use 0 as a default value, replace it with an appropriate default
    theme.palette.success.main
  )

  const altitudeOptions = createChartOptions(data?.Altitude || 0, theme.palette.info.main)

  const velocityOptions = createChartOptions(data?.Velocity || 0, theme.palette.warning.main)

  const percentageTemperature = data ? (data?.Temperature * 0.1).toFixed(2) : 0

  const percentageAltitude = data ? (data?.Altitude * 0.1).toFixed(2) : 0

  const percentageVelocity = data ? (data?.Velocity * 0.1).toFixed(2) : 0

  return (
    <>
      {data ? (
        <div style={{ display: 'flex', gap: '26px' }}>
          {/* Temperature Chart */}
          <Card style={{ flex: '1' }}>
            <CardContent>
              <Typography variant='h5'>{data.Temperature} </Typography>
              <Typography variant='body2' style={{ color: 'text.disabled' }}>
                Temperature rate
              </Typography>
              <ReactApexcharts
                type='radialBar'
                height={250} // Adjust the height as needed
                series={[percentageTemperature as number]}
                options={temperatureOptions}
              />
            </CardContent>
          </Card>

          {/* Altitude Chart */}
          <Card style={{ flex: '1' }}>
            <CardContent>
              <Typography variant='h5'>{data.Altitude} </Typography>
              <Typography variant='body2' style={{ color: 'text.disabled' }}>
                Altitude rate
              </Typography>
              <ReactApexcharts
                type='radialBar'
                height={250} // Adjust the height as needed
                series={[percentageAltitude as number]}
                options={altitudeOptions}
              />
            </CardContent>
          </Card>

          {/* Velocity Chart */}
          <Card style={{ flex: '1' }}>
            <CardContent>
              <Typography variant='h5'>{data.Velocity} </Typography>
              <Typography variant='body2' style={{ color: 'text.disabled' }}>
                Velocity rate
              </Typography>
              <ReactApexcharts
                type='radialBar'
                height={250} // Adjust the height as needed
                series={[percentageVelocity as number]}
                options={velocityOptions}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>Waiting for SpectrumWS api to connect...</div>
      )}
    </>
  )
}

export default SpectrumGaugesChart
