// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { IsarAeroSpaceLogo } from 'src/components'
import { CircularProgress } from '@mui/material'

interface FallbackSpinnerProps {
  sx?: BoxProps['sx']
}

const FallbackSpinner = ({ sx }: FallbackSpinnerProps) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <IsarAeroSpaceLogo size={100} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
