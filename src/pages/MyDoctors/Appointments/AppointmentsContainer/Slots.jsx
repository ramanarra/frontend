import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'

import useStyle from './useSlotsStyle'

function Slots({ slot, date, onSave, name, bgColor, txtColor, ModalComponent, bookedBy, note }) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const startTime = slot.startTime.split(':')

  const noon = startTime[0] >= 12 ? 'PM' : 'AM'

  if (startTime[0] > 12) {
    startTime[0] = startTime[0] - 12
  }

  const endTime = slot.endTime.split(':')

  const time = endTime[0] >= 12 ? 'PM' : 'AM'

  if (endTime[0] > 12) {
    endTime[0] = endTime[0] - 12
  }

  const dateWithTime = date + ' ' + startTime[0] + ':' + startTime[1] + noon

  function handleOnClick() {
    setOpen(true)
  }

  function handeOnClose(event) {
    setOpen(false)

    event.stopPropagation()
  }

  const DialogComponent = ModalComponent

  return (
    <Box className={classes.singleSlot}>
      <Box
        className={classes.box}
        onClick={handleOnClick}
        style={{ backgroundColor: bgColor }}
      >
        <Box className={classes.top} display="flex">
          <Box display="flex" width="100%">
            <Typography className={classes.name} style={{ color: txtColor }}>
              {name}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.bottom} display="flex">
          <ScheduleIcon className={classes.schedule} style={{ color: txtColor }} />
          <Typography className={classes.fromTime} style={{ color: txtColor }}>
            {startTime[0] + ':' + startTime[1] + ' - '}
          </Typography>
          <Typography className={classes.toTime} style={{ color: txtColor }}>
            {endTime[0] + ':' + endTime[1] + time}
          </Typography>
          <Typography className={classes.total} style={{ color: txtColor }}>
            {slot.slotTiming + 'm'}
          </Typography>
        </Box>
      </Box>
      {slot.id && DialogComponent &&
      <DialogComponent
      appointmentId={slot.id}
      patientId = {slot.patient_id}
      open={open}
      onClose={handeOnClose}
      slotTime={dateWithTime}
      onSave={onSave}
      bookedBy={bookedBy}
      note={note}
      />
      }
      {
        DialogComponent && 
        <DialogComponent
        slot={slot} 
        open={open}
        onClose={handeOnClose}
        onSave={onSave}
        slotTime={dateWithTime}
        />
      }
    </Box>
  )
}

export default Slots
