import { Grid, Card, CardContent, Typography, Box, IconButton, Tooltip, Button, Fab } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

import Icon from 'src/@core/components/icon'
import { CardData, SpectrumLiveStatusUIActionProps } from 'src/types'

// ** this component will be responsible for showing ui only
const SpectrumLiveTextBoxLiveData: React.FC<SpectrumLiveStatusUIActionProps> = ({
  data,
  onActionClick,
  isActionLoading
}) => {
  const cardData: CardData[] = data
    ? [
        {
          icon: 'fluent:live-20-filled',
          color: 'primary',
          tooltip: data.StatusMessage,
          velocity: data.Velocity,
          altitude: data.Altitude,
          temperature: data.Temperature,
          statusMessage: data.StatusMessage,
          isAscending: data.IsAscending,
          isActionRequired: data.IsActionRequired
        }
      ]
    : []

  return (
    <>
      <Grid container sx={{ ml: 1 }}>
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

                {/* Altiude */}
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
                    color='error'
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
    </>
  )
}

export default SpectrumLiveTextBoxLiveData
