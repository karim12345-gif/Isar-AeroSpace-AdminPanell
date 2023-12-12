import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
  CardHeader,
  useTheme,
  Fab
} from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Icon from 'src/@core/components/icon'
import { CardData, GetSpectrumStatus } from 'src/types'
import { ApexOptions } from 'apexcharts'

// ** interface that we will use to pass data from the dashboard component to the ui
interface SpectrumStatusUIProps {
  data?: GetSpectrumStatus
  onActionClick: () => void
  isActionLoading: boolean
}

// ** this component will be responsible for showing ui only
const SpectrumStatusUI: React.FC<SpectrumStatusUIProps> = ({ data, onActionClick, isActionLoading }) => {
  //** Hook */
  const theme = useTheme()

  const cardData: CardData[] = data
    ? [
        {
          icon: 'carbon:chart-line-data',
          color: 'primary',
          tooltip: data.statusMessage,
          velocity: data.velocity,
          altitude: data.altitude,
          temperature: data.temperature,
          statusMessage: data.statusMessage,
          isAscending: data.isAscending,
          isActionRequired: data.isActionRequired
        }
      ]
    : []

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
    <>
      <Grid container spacing={5} sx={{ ml: 1 }}>
        {/* Card box that will show, the current temperature */}
        {cardData.map((item, index: number) => (
          <Grid item xs={12} sm={12} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/*  Temperature */}
                  <Box display={'flex'} gap={2}>
                    <Typography sx={{ color: 'text.secondary' }}>Temperature:</Typography>
                    {item.temperature ? (
                      <CustomChip
                        rounded
                        size='medium'
                        skin='light'
                        color={item.temperature < 0 ? 'error' : 'success'}
                        label={item.temperature < 0 ? `${item.temperature}%` : `+ ${item.temperature}%`}
                      />
                    ) : null}
                  </Box>

                  {/* ICon */}
                  <Tooltip title={item.tooltip}>
                    <IconButton>
                      <Icon icon='mdi:question-mark-circle-outline' />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Velocity  */}
                <Box sx={{ mt: 5 }} display={'flex'} gap={10}>
                  <Typography sx={{ color: 'text.secondary' }}>Velocity:</Typography>
                  {item.velocity ? (
                    <CustomChip
                      rounded
                      size='medium'
                      skin='light'
                      color={item.velocity < 0 ? 'info' : 'warning'}
                      label={item.velocity < 0 ? `${item.velocity}%` : `+ ${item.velocity}%`}
                    />
                  ) : null}
                </Box>

                {/* Altitude */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <Box sx={{ mt: 5 }} display={'flex'} gap={10}>
                    <Typography sx={{ color: 'text.secondary' }}>Altitude:</Typography>
                    {item.altitude ? (
                      <CustomChip
                        rounded
                        size='small'
                        skin='light'
                        color={item.altitude < 0 ? 'error' : 'success'}
                        label={item.altitude < 0 ? `${item.altitude}%` : `+ ${item.altitude}%`}
                      />
                    ) : null}
                  </Box>

                  {/* Icon */}
                  <Fab size='small' color={item.color} sx={{ color: 'text.disabled', ml: 'auto' }}>
                    <Icon icon={item.icon} color='white' />
                  </Fab>
                </Box>

                {/* Vechilce Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 8 }}>
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Vehicle Status :{' '}
                    {!item.isAscending ? (
                      <CustomChip rounded size='small' skin='light' color='success' label='Ascending' />
                    ) : (
                      <CustomChip rounded size='small' skin='light' color='error' label='Ascending' />
                    )}
                  </Typography>

                  {/* Action required Status */}
                  <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    Action Required Status :{' '}
                    {!item.isActionRequired ? (
                      <CustomChip rounded size='small' skin='light' color='success' label='No Action Required' />
                    ) : (
                      <CustomChip rounded size='small' skin='light' color='error' label='Action Required' />
                    )}
                  </Typography>

                  {/* Button for taking action */}
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={!item?.isActionRequired || isActionLoading}
                    onClick={onActionClick}
                  >
                    Take Action
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='SpectrumStatus'
            subheader='This endpoint returns important sensor data, specifically the current velocity, altitude, temperature.'
            subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
          />
          <CardContent>
            <ReactApexcharts type='bar' height={650} options={options} series={seriesData} />
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default SpectrumStatusUI
