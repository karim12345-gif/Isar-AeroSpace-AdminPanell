// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import { ThemeColor } from 'src/@core/layouts/types'
import { CardHeader, Fab, IconButton, Tooltip, useTheme } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { useRouter } from 'next/router'
import { AeroSpaceController } from 'src/controllers'
import { GetSpectrumStatus } from 'src/types'
import { ApexOptions } from 'apexcharts'

export interface CardData {
  icon: string
  title: string
  tooltip: string
  color: ThemeColor
  velocity: number
  altitude: number
  temperature: number
  statusMessage: string
  isAscending: boolean
  isActionRequired: boolean
}

// const donutColors = {
//   series1: '#1a1aff', // Dark Blue
//   series2: '#0080ff', // Medium Blue
//   series3: '#00BFFF' // Light Blue
// }
const SpectrumStatistics = () => {
  // ** States
  const [spectrumOverviewNumbers, setSpectrumOverviewNumbers] = useState<GetSpectrumStatus>()

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()

  //* this function will be responsible for fetching the data
  const getSpectrumStatus = async () => {
    const response = await new AeroSpaceController(router).GetSpectrumStatus()

    //!! if there is no response return
    if (!response) return

    setSpectrumOverviewNumbers(response)
  }

  useEffect(() => {
    getSpectrumStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //?? inheriting from our interface so we can use it with out use state
  const cardData: CardData[] = spectrumOverviewNumbers
    ? [
        {
          title: 'Temperature',
          icon: 'ep:data-line',
          color: 'primary',
          tooltip: spectrumOverviewNumbers.statusMessage,
          velocity: spectrumOverviewNumbers.velocity,
          altitude: spectrumOverviewNumbers.altitude,
          temperature: spectrumOverviewNumbers.temperature,
          statusMessage: spectrumOverviewNumbers.statusMessage,
          isAscending: spectrumOverviewNumbers.isAscending,
          isActionRequired: spectrumOverviewNumbers.isActionRequired
        }
      ]
    : []

  const temperatureData: number | undefined = spectrumOverviewNumbers?.temperature ?? 0
  const altitudeData: number | undefined = spectrumOverviewNumbers?.altitude ?? 0
  const velocityData: number | undefined = spectrumOverviewNumbers?.velocity ?? 0

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
        formatter: (value: number) => {
          return `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} OMR`
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
                      <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
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
                    <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
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
                      Action Required: Status :{' '}
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

export default SpectrumStatistics
