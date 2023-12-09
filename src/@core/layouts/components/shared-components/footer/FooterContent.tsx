// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

//** This is a footer function to show the current year with title and link  */
const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 8 }}>
        {`© ${new Date().getFullYear()}, Isar AeroSpace `}
        <Box component='span' sx={{ color: 'error.main' }}>
          🚀📡👩‍🚀
        </Box>
        {` by `}
        <LinkStyled target='_blank' href='https://www.isaraerospace.com/'>
          AeroSpace
        </LinkStyled>
      </Typography>
    </Box>
  )
}

export default FooterContent
