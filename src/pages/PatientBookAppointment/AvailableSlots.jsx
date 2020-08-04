import React, { useState } from 'react'
import classNames from 'classnames'
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'

import getTimeFormatWithNoon from '../../lib/dateLib'

const useStyle = makeStyles(() => ({
  container: {
    width: 500,
  },
  availableSlots: {
    paddingTop: 150,
  },
  time: {
    width: 100,
    border: '1.5px solid #dadada',
    marginLeft: 10,
    marginBottom: 15,
    borderRadius: 3,
    '&:hover': {
      backgroundColor: '#54cbff',
      border: '1.5px solid #54cbff',
    },
  },
  timeText: {
    fontSize: 12.8,
    paddingTop: 2,
    color: '#a0a0a0',
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
    <Box className={classes.container}>
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
    </Box>
  )
}

export default AvailableSlots
