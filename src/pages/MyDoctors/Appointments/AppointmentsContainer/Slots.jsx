import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import StarIcon from '@material-ui/icons/Star'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import useStyle from './useSlotsStyle'
import Stretch from '../../../../components/Stretch'
import getTimeFormatWithNoon, { getTimeFormat } from '../../../../lib/dateLib'

function Slots({
  singleStar,
  doubleStar,
  slot,
  date,
  onSave,
  name,
  bgColor,
  txtColor,
  ModalComponent,
  bookedBy,
  note,
}) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const startTime = getTimeFormat(slot.startTime)

  const endTime = getTimeFormatWithNoon(slot.endTime)

  const dateWithTime = `${date} ${getTimeFormatWithNoon(startTime)} `

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
            {singleStar || doubleStar ? (
              <StarIcon className={classes.star} color="primary" />
            ) : null}
            {doubleStar && (
              <StarIcon className={classes.star} color="primary" />
            )}
            <Typography className={classes.name} style={{ color: txtColor }}>
              {name}
            </Typography>
            <Stretch />
            <div className={classes.round}>
              <FiberManualRecordIcon style={{ color: txtColor }} />
            </div>
          </Box>
        </Box>
        <Box className={classes.bottom} display="flex">
          <ScheduleIcon className={classes.schedule} style={{ color: txtColor }} />
          <Typography className={classes.fromTime} style={{ color: txtColor }}>
            {`${startTime} - `}
          </Typography>
          <Typography className={classes.toTime} style={{ color: txtColor }}>
            {endTime}
          </Typography>
          <Stretch />
          <Typography className={classes.total} style={{ color: txtColor }}>
            {slot.slotTiming + 'm'}
          </Typography>
        </Box>
      </Box>
      {DialogComponent && (
        <DialogComponent
          appointmentId={slot.id}
          patientId={slot.patient_id}
          open={open}
          onClose={handeOnClose}
          slotTime={dateWithTime}
          onSave={onSave}
          bookedBy={bookedBy}
          note={note}
          singleStar={singleStar}
          doubleStar={doubleStar}
        />
      )}
    </Box>
  )
}

export default Slots
