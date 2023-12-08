// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { MaalyLogo } from 'src/components'
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
      <MaalyLogo size={100} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
