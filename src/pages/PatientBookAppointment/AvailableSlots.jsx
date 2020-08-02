import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'

import getTimeFormatWithNoon from '../../lib/dateLib'

const useStyle = makeStyles(() => ({
  time: {},
  selectedTab: {},
}))

function AvailableSlots({ availableSlots, handleSlotTiming }) {
  const classes = useStyle()

  const [time, setTime] = useState({ start: '00:00:00', end: '00:00:00' })

  const handleOnClick = (slotTiming) => {
    setTime(slotTiming)
    handleSlotTiming(slotTiming)
  }

  return (
    <Box>
      {availableSlots &&
        availableSlots.map((slot, index) => {
          return (
            <Button
              className={classNames(classes.time, {
                [classes.selectedTab]: time.start === slot.start,
              })}
              onClick={() => handleOnClick(slot)}
            >
              <Typography
                className={classNames(classes.timeText, {
                  [classes.selectedText]: time.start === slot.start,
                })}
              >
                {getTimeFormatWithNoon(slot.start)}
              </Typography>
            </Button>
          )
        })}
    </Box>
  )
}

export default AvailableSlots
