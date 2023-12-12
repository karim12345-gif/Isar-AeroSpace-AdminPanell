// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import { CardHeader, useTheme } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { SpectrumLiveStatusUIProps } from 'src/types'

const donutColors = {
  series1: '#0079FF',
  series2: '#00DFA2',
  series3: '#FF55BB',
  series4: '#FF0060',
  series5: '#FFAED2'
}

const SpectrumHorizontalBarChartLiveData: React.FC<SpectrumLiveStatusUIProps> = ({ data }) => {
  // ** Hooks
  const theme = useTheme()

  const temperature: number | undefined = data?.Temperature ?? 0
  const altitude: number | undefined = data?.Altitude ?? 0
  const velocity: number | undefined = data?.Velocity ?? 0

  const seriesData = [
    {
      name: 'Temperature',
      data: [temperature]
    },
    {
      name: 'Altitude',
      data: [altitude]
    },
    {
      name: 'Velocity',
      data: [velocity]
    }
  ]

  //!! the chart options
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: `Spectrum Status`,
            columnDelimiter: ',',
            headerCategory: 'Values',
            headerValue: 'Total Values'
          }
        }
      }
    },
    stroke: { width: 0 },
    labels: ['Temperature', 'Altitude', 'Velocity'],
    colors: [donutColors.series1, donutColors.series3, donutColors.series2],
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
      bar: {
        horizontal: true
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          const percentage = (val / (temperature + altitude + velocity)) * 100

          return `${percentage.toString().match(/\d+(?:\.\d{0,2})?/)}%`
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
            bar: {
              horizontal: false
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Spectrum Status Chart'
        subheader='his endpoint returns important sensor data, specifically the current velocity, altitude, temperature.'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        {data ? (
          <ReactApexcharts type='bar' height={300} options={options} series={seriesData} />
        ) : (
          <div>Waiting for SpectrumWS api to connect...</div>
        )}
      </CardContent>
    </Card>
  )
}

export default SpectrumHorizontalBarChartLiveData
