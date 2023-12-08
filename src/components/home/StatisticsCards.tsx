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
import { Fab, IconButton, Tooltip } from '@mui/material'

import CustomChip from 'src/@core/components/mui/chip'

export interface CardData {
  icon: string
  title: string
  tooltip: string
  color: ThemeColor
  changePercentage?: number
  totalUsers?: number | JSX.Element
}

const StatisticsCards = () => {
  const cardData: CardData[] = [
    {
      totalUsers: 12434,
      title: 'All Subscriptions',
      icon: 'mdi-account-multiple',
      color: 'primary',
      tooltip: 'Number of active accounts ',
      changePercentage: 12
    },
    {
      totalUsers: 54213,
      title: 'Padding Subscriptions',
      icon: 'mdi-account-convert',
      color: 'success',
      tooltip: ' Number of padding subscriptions',
      changePercentage: 17
    },
    {
      totalUsers: 859,
      title: 'Active Subscriptions',
      icon: 'mdi-account-check',
      color: 'info',
      tooltip: 'Number of active subscriptions',
      changePercentage: 56
    }
  ]

  return (
    <Grid container spacing={6} className='match-height'>
      <Grid container spacing={5} sx={{ ml: 1 }}>
        {cardData.map((item, index: number) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box display={'flex'} gap={2}>
                    <Typography sx={{ color: 'text.secondary' }}>{item.title}</Typography>
                    {item.changePercentage ? (
                      <CustomChip
                        rounded
                        size='small'
                        skin='light'
                        color={item.changePercentage < 0 ? 'error' : 'success'}
                        label={item.changePercentage < 0 ? `${item.changePercentage}%` : `+ ${item.changePercentage}%`}
                      />
                    ) : null}
                  </Box>
                  <Tooltip title={item.tooltip}>
                    <IconButton>
                      <Icon icon='mdi:question-mark-circle-outline' />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  {typeof item.totalUsers === 'number' ? (
                    <Typography variant='h4' sx={{ mb: 1 }}>
                      {/* If decimal values are all zeros then remove the zeros and show the integer value else show the value with the decimals */}
                      {item.totalUsers}
                    </Typography>
                  ) : (
                    item.totalUsers // JSX element
                  )}
                  <Fab size='small' color={item.color} sx={{ color: 'text.disabled' }}>
                    <Icon icon={item.icon} color='white' />
                  </Fab>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default StatisticsCards
