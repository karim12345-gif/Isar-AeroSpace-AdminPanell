import { useEffect, useState } from 'react'
import { GetSpectrumStatus } from 'src/types'

// ** Custom Component Import
import { ThemeColor } from 'src/@core/layouts/types'
import { Box, Card, CardContent, CardHeader, Fab, Grid, IconButton, Tooltip, Typography, useTheme } from '@mui/material'
import { ApexOptions } from 'apexcharts'
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

export interface CardData {
  icon: string
  tooltip: string
  color: ThemeColor
  velocity: number
  altitude: number
  temperature: number
  statusMessage: string
  isAscending: boolean
  isActionRequired: boolean
}
const SpectrumLiveStream = () => {
  // ** States
  const [socket, setSocket] = useState<GetSpectrumStatus>()

  // ** Hooks
  const theme = useTheme()

  //** function that will handle the fetching of the websocket data
  const getSpectrumLiveData = () => {
    try {
      const newSocket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS')

      newSocket.addEventListener('message', event => {
        console.log('WebSocket message received:', event.data)

        const data = JSON.parse(event.data)

        setSocket(data)

        // This piece of code is executed when the WebSocket component receives a message,
        // and the data.IsActionRequired property is true
        // then we inform the parent component
        if (data.IsActionRequired) {
          // Notify the parent component (SpectrumStatistics) about the action required
          // onActionRequiredUpdate(true)

          // Close the WebSocket connection
          newSocket.close()
        }
      })

      return () => {
        // Close the WebSocket connection when the component unmounts
        if (newSocket.readyState === WebSocket.OPEN) {
          newSocket.close()
        }
      }
    } catch (error) {
      console.error('Error creating WebSocket:', error)
    }
  }

  useEffect(() => {
    getSpectrumLiveData()
  }, []) // empty dependency array to run effect only once on mount

  // Check if socket is of type GetSpectrumStatus before accessing its properties

  if (socket && 'Altitude' in socket) {
    console.log('socket Altitude:', socket.Altitude)
  }

  const cardData: CardData[] = socket
    ? [
        {
          icon: 'ep:data-line',
          color: 'primary',
          tooltip: socket.statusMessage,
          velocity: socket.velocity,
          altitude: socket.altitude,
          temperature: socket.temperature,
          statusMessage: socket.statusMessage,
          isAscending: socket.isAscending,
          isActionRequired: socket.isActionRequired
        }
      ]
    : []

  const temperatureData: number | undefined = socket?.temperature ?? 0
  const altitudeData: number | undefined = socket?.altitude ?? 0
  const velocityData: number | undefined = socket?.velocity ?? 0

  console.log('temperatureData', temperatureData)

  //? an array of objects that has all data
  const seriesData = [
    {
      name: 'Temperature',
      data: [temperatureData]
    },
    {
      name: 'Altitude',
      data: [altitudeData]
    },
    {
      name: 'Velocity',
      data: [velocityData]
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
          type: 'none' /* none, lighten, darken */
        }
      }
    },
    colors: ['#00cde9'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '20%',
        horizontal: false,
        startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: false }
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
        // ** Shown integer values with commas but without decimal places
        formatter: (value: number) => {
          return `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} `
        }
      }
    }
  }

  const renderCards = () => (
    <>
      <Grid container spacing={5} sx={{ ml: 1 }}>
        {/* Card box that will show, the current temperature */}
        {cardData &&
          cardData.map((item, index: number) => (
            <Grid item xs={12} sm={8} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Temperature */}
                    <Box display={'flex'} gap={2}>
                      <Typography sx={{ color: 'text.secondary' }}>Temperature:</Typography>
                      {item.temperature ? (
                        <CustomChip
                          rounded
                          size='small'
                          skin='light'
                          color={item.temperature < 0 ? 'error' : 'success'}
                          label={item.temperature < 0 ? `${item.temperature}%` : `+ ${item.temperature}%`}
                        />
                      ) : null}
                    </Box>

                    {/* Icon */}
                    <Tooltip title={item.tooltip}>
                      <IconButton>
                        <Icon icon='mdi:question-mark-circle-outline' />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Velocity */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    {typeof item.velocity === 'number' ? (
                      <Typography variant='h6' sx={{ mb: 1 }}>
                        {`velocity: ${item.velocity}`}
                      </Typography>
                    ) : (
                      item.velocity // JSX element
                    )}
                    <Fab size='small' color={item.color} sx={{ color: 'text.disabled' }}>
                      <Icon icon={item.icon} color='white' />
                    </Fab>
                  </Box>

                  {/* Temperature */}
                  <Box sx={{ mt: 5 }} display={'flex'} gap={2}>
                    <Typography sx={{ color: 'text.secondary' }}>Altitude</Typography>
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 8 }}>
                    {/* ascending status*/}
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                      Vehicle Status :{' '}
                      {` Vehicle Status:${!item.isAscending} ` ? (
                        <CustomChip rounded size='small' skin='light' color='success' label='Ascending' />
                      ) : (
                        <CustomChip
                          rounded
                          size='small'
                          skin='light'
                          color='error' // Change color to red for action required
                          label='Ascending'
                        />
                      )}
                    </Typography>

                    {/* Action required status*/}
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                      {/* if the action is not true, then no action required  */}
                      Action Required Status :{' '}
                      {!item.isActionRequired ? (
                        <CustomChip rounded size='small' skin='light' color='success' label='No Action Required' />
                      ) : (
                        <CustomChip
                          rounded
                          size='small'
                          skin='light'
                          color='error' // Change color to red for action required
                          label='Action Required'
                        />
                      )}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

        {cardData &&
          cardData.map((item, index: number) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardHeader title='Alert 🚀'></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2, color: 'red' }}>Current Status: {item.statusMessage}</Typography>
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
            <ReactApexcharts type='bar' height={400} options={options} series={seriesData} />
          </CardContent>
        </Card>
      </Grid>
    </>
  )

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
    </Grid>
  )
}

export default SpectrumLiveStream
