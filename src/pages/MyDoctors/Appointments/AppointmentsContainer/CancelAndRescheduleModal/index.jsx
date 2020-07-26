import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import { METHOD, URL } from '../../../../../api'
import useManualFetch from '../../../../../hooks/useManualFetch'
import CancleAppointment from './CancleAppointmentDialog'
import RescheduleAppointment from './RescheduleAppointmentDialog'
import useStyle from './useStyle'

function CancleAndRescheduleModal({
  appointmentId,
  patientId,
  open,
  onClose,
  slotTime,
  onSave,
  bookedBy,
  note
}) {
  const classes = useStyle()

  const [fetch, error, isLoading, patientView] = useManualFetch()

  const [openCanclationDialog, setCanclationDialog] = useState(false)

  const [openReschedule, setOpenReschedule] = useState(false)

  useEffect(() => {
    if(open) {
      const params = {
        appointmentId: appointmentId,
      }
      fetch(METHOD.POST, URL.appointmentView, params)
    }

  }, [open, appointmentId])

  function handleCancle(event) {
    onClose(event)
    setCanclationDialog(true)
  }

  function handleClose(event) {
    onClose(event)
    setCanclationDialog(false)
    setOpenReschedule(false)
  }

  function handleReschedule(event) {
    onClose(event)
    setOpenReschedule(true)
  }

  return (
    <Box>
      {patientView ? (
        <Dialog open={open} className={classes.dialogBox}>
          <DialogTitle>
            <Box display="flex">
              <Typography className={classes.title}>Appointment</Typography>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box className={classes.slot}>
              <Typography className={classes.text}>
                Your slot time {slotTime}
              </Typography>
            </Box>
            <Box display="flex" className={classes.details}>
              <Box>
                <Box display="flex">
                  <Typography className={classes.phoneNumber}>
                    Phone Number
                  </Typography>
                  <Typography className={classes.notchedOutline}>
                    {patientView.patientDetails?.phone}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.firstName}>First Name</Typography>
                  <Typography className={classes.notchedOutline}>
                    {patientView.patientDetails?.firstName}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Typography className={classes.lastName}>Last Name</Typography>
                  <Typography className={classes.notchedOutline}>
                    {patientView.patientDetails?.lastName}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.email}>Email ID</Typography>
                  <Typography className={classes.notchedOutline}>
                    {patientView.patientDetails?.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" paddingTop={1.5}>
              {bookedBy === 'Doctor' && <StarIcon className={classes.starIcon} color="primary" />}
              <Typography className={classNames(classes.note, {
                      [classes.patientNote]: bookedBy === 'Patient',
                    })}>
                {note}
              </Typography>
            </Box>
          </DialogContent>
          <Box display="flex">
            <Box className={classes.cancle} onClick={handleCancle}>
              <Typography className={classes.cancleBtn}>
                CANCLE APPOINTMENT
              </Typography>
            </Box>
            <Box className={classes.reschedule} onClick={handleReschedule}>
              <Typography className={classes.rescheduleBtn}>
                RESCHEDULE APPOINTMENT
              </Typography>
            </Box>
          </Box>
        </Dialog>
      ) : null}

    {openCanclationDialog &&
      <CancleAppointment
        open={openCanclationDialog}
        slotTime={slotTime}
        onClose={handleClose}
        id={appointmentId}
        onSave={onSave}
      />
    }
      {openReschedule && (
        <RescheduleAppointment
          appointmentId={appointmentId}
          patientId={patientId}
          open={openReschedule}
          slotTime={slotTime}
          onClose={handleClose}
          details={patientView}
          onSave={onSave}
          bookedBy={bookedBy}
          note={note}
        />
      )}
    </Box>
  )
}

export default CancleAndRescheduleModal
