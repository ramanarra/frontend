import React from 'react'
import classNames from 'classnames'
import { Box, Button, Typography } from '@material-ui/core'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import moment from 'moment'

import getTimeFormatWithNoon from '../../lib/dateLib'
import useStyle from './useAvailableSlotsStyle'

function AvailableSlots({ availableSlots, handleSlotTiming, time, date }) {
  const classes = useStyle()

  const handleOnClick = (slot) => {
    handleSlotTiming(slot)
  }

  let currentTime = moment().format('HH:mm:ss')

  let todayDate = moment().format('DD/MM/YYYY')

  return (
    <Box className={classes.container}>
      <Box className={classes.availableSlots}>
        {availableSlots &&
          availableSlots.map((slot, index) => {
            let show = moment(date).format('DD/MM/YYYY') === todayDate ?
                        slot.startTime > currentTime ? true : false
                        : true
            return (
              show &&
              <Button
                className={classNames(classes.time, {
                  [classes.selectedTab]: time.start === slot.startTime,
                })}
                onClick={() => handleOnClick(slot)}
                key={index}
              >
                {time.start === slot.startTime ? (
                  <Box display="flex">
                    <Typography className={classes.selectedText}>
                      {getTimeFormatWithNoon(slot.startTime)}
                    </Typography>
                    <CheckCircleRoundedIcon className={classes.icon} />
                  </Box>
                ) : (
                  <Typography className={classes.timeText}>
                    {getTimeFormatWithNoon(slot.startTime)}
                  </Typography>
                )}
              </Button>
            )
          })}
          {
            availableSlots && availableSlots.length === 0 &&
            <Typography className={classes.errorMessage}>No slots are available on that date</Typography>
          }
      </Box>
    </Box>
  )
}

export default AvailableSlots
