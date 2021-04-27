import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import StarIcon from '@material-ui/icons/Star'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import moment from 'moment'

import useStyle from './useSlotsStyle'
import Stretch from '../../../../components/Stretch'
import getTimeFormatWithNoon from '../../../../lib/dateLib'

function Slots({
  doctorKey,
  singleStar,
  doubleStar,
  slot,
  date,
  onSave,
  name,
  bgColor,
  textColor,
  ModalComponent,
  bookedBy,
  note,
  cancellationNote,
}) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const startTime = getTimeFormatWithNoon(slot.startTime)

  const endTime = getTimeFormatWithNoon(slot.endTime)

  const slotTime = `${date} ${getTimeFormatWithNoon(slot.startTime)} `

  function handleOnClick() {
    setOpen(true)

  }

  function handeOnClose(event) {
    setOpen(false)

    event.stopPropagation()
  }

  const DialogComponent = ModalComponent

  let currentTime = moment().format('HH:mm:ss')

  let currentDate = moment().format('DD/MM/YYYY')

  let show = date === currentDate ?
      slot.startTime > currentTime ? true : false
      : true
  return (
    show && (
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
              {doubleStar && <StarIcon className={classes.star} color="primary" />}
              <Typography className={classes.name} style={{ color: textColor }}>
                {name}
              </Typography>
              <Stretch />
              <div className={classes.round}>
                <FiberManualRecordIcon style={{ color: textColor }} />
              </div>
            </Box>
          </Box>
          <Box className={classes.bottom} display="flex">
            <ScheduleIcon
              className={classes.schedule}
              style={{ color: textColor }}
            />
            <Typography className={classes.fromTime} style={{ color: textColor }}>
              {`${startTime} - `}
            </Typography>
            <Typography className={classes.toTime} style={{ color: textColor }}>
              {endTime}
            </Typography>
            <Stretch />
            <Typography className={classes.total} style={{ color: textColor }}>
              {`${slot.slotTiming}m`}
            </Typography>
          </Box>
        </Box>
        {DialogComponent && (
          <DialogComponent
            doctorKey={doctorKey}
            appointmentId={slot.id}
            patientId={slot.patient_id}
            open={open}
            onClose={handeOnClose}
            slotTime={slotTime}
            onSave={onSave}
            bookedBy={bookedBy}
            note={note}
            singleStar={singleStar}
            doubleStar={doubleStar}
            cancellationNote={cancellationNote}
            slot={slot}
          />
        )}
      </Box>
    )
  )
}

export default Slots
