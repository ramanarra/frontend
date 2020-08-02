import React, { useState } from 'react'
import classNames from 'classnames'
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'

import getTimeFormatWithNoon from '../../lib/dateLib'

const useStyle = makeStyles(() => ({
  availableSlots: {},
  time: {
    width: 100,
    border: '1.5px solid #a8a8a8',
    marginLeft: 10,
    marginBottom: 15,
    '&:hover': {
      backgroundColor: '#54cbff',
    },
  },
  timeText: {
    fontSize: 14,
    paddingTop: 2,
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedTab: {
    backgroundColor: '#0bb5ff',
    border: '1.5px solid #0bb5ff',
  },
  selectedText: {
    color: '#ffffff',
    fontSize: 14,
    paddingTop: 2,
  },
  icon: {
    width: 16,
    color: '#ffffff',
    marginLeft: 6,
  },
}))

function AvailableSlots({ availableSlots, handleSlotTiming }) {
  const classes = useStyle()

  const [time, setTime] = useState({ start: '00:00:00', end: '00:00:00' })

  const handleOnClick = (slot) => {
    setTime(slot)
    handleSlotTiming(slot)
  }

  return (
    <Box className={classes.availableSlots}>
      {availableSlots &&
        availableSlots.map((slot, index) => {
          return (
            <Button
              className={classNames(classes.time, {
                [classes.selectedTab]: time.start === slot.start,
              })}
              onClick={() => handleOnClick(slot)}
            >
              {time.start === slot.start ? (
                <Box display="flex">
                  <Typography className={classes.selectedText}>
                    {getTimeFormatWithNoon(slot.start)}
                  </Typography>
                  <CheckCircleRoundedIcon className={classes.icon} />
                </Box>
              ) : (
                <Typography className={classes.timeText}>
                  {getTimeFormatWithNoon(slot.start)}
                </Typography>
              )}
            </Button>
          )
        })}
    </Box>
  )
}

export default AvailableSlots
