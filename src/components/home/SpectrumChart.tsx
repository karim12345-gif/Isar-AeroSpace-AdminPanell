// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import { ThemeColor } from 'src/@core/layouts/types'
import { CardHeader, useTheme } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { useRouter } from 'next/router'
import { AeroSpaceController } from 'src/controllers'
import { GetSpectrumStatus } from 'src/types'
import { ApexOptions } from 'apexcharts'

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

const donutColors = {
  series1: '#0079FF',
  series2: '#00DFA2',
  series3: '#FF55BB',
  series4: '#FF0060',
  series5: '#FFAED2'
}

const SpectrumChart = () => {
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

  if (!spectrumOverviewNumbers) {
    return <div>Loading...</div>
  }

  const temperatureData: number | undefined = spectrumOverviewNumbers.temperature ?? 0
  const altitudeData: number | undefined = spectrumOverviewNumbers.altitude ?? 0
  const velocityData: number | undefined = spectrumOverviewNumbers.velocity ?? 0

  const TotalValues = temperatureData + altitudeData + velocityData

  const categories = ['Temperature', 'Altitude', 'Velocity']

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
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: `User Budget Percentage`,
            columnDelimiter: ',',
            headerCategory: 'Users',
            headerValue: 'Total Values'
          }
        }
      }
    },
    stroke: { width: 0 },
    labels: categories,
    colors: [donutColors.series1, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return val.toString().match(/(^.*?\d)(?=(\d{3})+(?!\d)|$)/g) + '%'
      }
    },
    legend: {
      position: 'right',
      horizontalAlign: 'center',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      onItemHover: {
        highlightDataSeries: false
      }
    },

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true, // Set this to false to hide the percentage sign
            name: {
              fontSize: '1rem' // Reduce font size for the name label
            },
            value: {
              fontSize: '1rem',
              formatter: (val: string) => {
                const floatValue = parseFloat(val).toFixed(2) // Fix value to two decimal places
                const intValue = parseInt(floatValue, 10)

                if (intValue >= 1000) {
                  const formattedValue = intValue.toLocaleString() // Adds comma for thousands separator

                  return `${formattedValue} `
                } else {
                  return `${floatValue} `
                }
              }
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '1.1rem', // Customize font size for the total label
              color: theme.palette.text.primary // Customize the color of the total label
              // formatter: () => {
              //   return TotalValues // Customize the total value text
              // }
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          const percentage = (val / TotalValues) * 100

          return `${percentage.toFixed(2)}%`
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,

                  name: {
                    fontSize: theme.typography.body1.fontSize
                  },
                  value: {
                    fontSize: theme.typography.body1.fontSize
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='User Budget Percentage'
        subheader='Users who set their budget'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        {spectrumOverviewNumbers ? (
          <ReactApexcharts type='donut' height={300} options={options} series={seriesData} />
        ) : (
          <div>Loading...</div>
        )}
      </CardContent>
    </Card>
  )
}

export default SpectrumChart
