// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import {  Typography, useTheme } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { useRouter } from 'next/router'
import { AeroSpaceController } from 'src/services/controllers'
import { GetSpectrumStatus } from 'src/types'
import { ApexOptions } from 'apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'



const SpectrumChart = () => {
  // ** States
  const [spectrumOverviewNumbers, setSpectrumOverviewNumbers] = useState<GetSpectrumStatus>()

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()

  //* this function will be responsible for fetching the data
  // ** using useCallback to avoid unnecessary re-renders 
  const getSpectrumStatus = useCallback(async () => {
    const response = await new AeroSpaceController(router).GetSpectrumStatus()

    //!! if there is no response return
    if (!response) return

    setSpectrumOverviewNumbers(response)
  },[router])

  useEffect(() => {
    getSpectrumStatus()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  const createChartOptions = (data: number, color: string): ApexOptions => ({
    chart: {
      sparkline: { enabled: true },
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(color, 1)],
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '64%' },
        track: {
          strokeWidth: '40%',
          background: hexToRGBA(theme.palette.customColors.trackBg, 1),
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -3,
            fontWeight: 600,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.h4.fontSize as string,
          },
        },
      },
    },
    grid: {
      padding: {
        bottom: 15,
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          chart: { height: 200 },
        },
      },
      {
        breakpoint: 960,
        options: {
          chart: { height: 160 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          chart: { height: 190 },
        },
      },
      {
        breakpoint: 660,
        options: {
          chart: { height: 160 },
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          chart: { height: 150 },
        },
      },
      {
        breakpoint: 425,
        options: {
          chart: { height: 130 },
        },
      },
    ],
  });

  
  const temperatureOptions = createChartOptions(
    spectrumOverviewNumbers?.temperature || 0, // Use 0 as a default value, replace it with an appropriate default
    theme.palette.success.main
  );

  const altitudeOptions = createChartOptions(
    spectrumOverviewNumbers?.altitude || 0,
    theme.palette.info.main
  );

  const velocityOptions = createChartOptions(
    spectrumOverviewNumbers?.velocity || 0 ,
    theme.palette.warning.main
  );


  

  const percentageTemperature = spectrumOverviewNumbers ? (spectrumOverviewNumbers?.temperature * 10).toString().match(/\d+(?:\.\d{0,2})?/) : 0
  const percentageAltidue = spectrumOverviewNumbers ? (spectrumOverviewNumbers?.altitude * 10).toString().match(/\d+(?:\.\d{0,2})?/) : 0
  const percentageVelocity = spectrumOverviewNumbers ? (spectrumOverviewNumbers?.velocity * 10).toString().match(/\d+(?:\.\d{0,2})?/) : 0

// ...

return (
  <>
    {spectrumOverviewNumbers ? (
      <div style={{ display: 'flex', gap: '26px' }}>
        {/* Temperature Chart */}
        <Card style={{ flex: '1' }}>
          <CardContent>
            <Typography variant='h5'>{spectrumOverviewNumbers.temperature} </Typography>
            <Typography variant='body2' style={{ color: 'text.disabled' }}>
              Temperature rate
            </Typography>
            <ReactApexcharts
              type='radialBar'
              height={250}  // Adjust the height as needed
              series={[percentageTemperature as number]}
              options={temperatureOptions}
            />
          </CardContent>
        </Card>

        {/* Altitude Chart */}
        <Card style={{ flex: '1' }}>
          <CardContent>
            <Typography variant='h5'>{spectrumOverviewNumbers.altitude} </Typography>
            <Typography variant='body2' style={{ color: 'text.disabled' }}>
              Altitude rate
            </Typography>
            <ReactApexcharts
              type='radialBar'
              height={250}  // Adjust the height as needed
              series={[percentageAltidue as number]}
              options={altitudeOptions}
            />
          </CardContent>
        </Card>

        {/* Velocity Chart */}
        <Card style={{ flex: '1' }}>
          <CardContent>
            <Typography variant='h5'>{spectrumOverviewNumbers.velocity} </Typography>
            <Typography variant='body2' style={{ color: 'text.disabled' }}>
              Velocity rate
            </Typography>
            <ReactApexcharts
              type='radialBar'
              height={250}  // Adjust the height as needed
              series={[percentageVelocity as number]}
              options={velocityOptions}
            />
          </CardContent>
        </Card>
      </div>
    ) : null}
  </>
);

}

export default SpectrumChart
