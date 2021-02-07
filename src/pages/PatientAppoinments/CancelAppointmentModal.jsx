import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { URL } from '../../api'
import useStyle from './useCancelAppointmentStyle'

function CancelAppointmentModal({ open, time, date, onClose, appointmentId, onSave }) {
  const classes = useStyle()

  function handleOnClose() {
    onClose()
  }

  function handleOnClick() {
    onSave(URL.patientAppointmentCancel, {appointmentId: appointmentId, confirmation: true})
    onClose()
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent className={classes.content}>
          <CloseIcon className={classes.icon} onClick={handleOnClose} />
          <Box className={classes.confirmationText}>
            <Typography className={classes.heading} variant="h5">
              Confirmation
            </Typography>
            <Typography className={classes.text}>
              Are you sure want to cancel your appointment {time} {date}?
            </Typography>
          </Box>
          <Box className={classes.button} display="flex">
            <Box className={classes.cancleButton} onClick={handleOnClose}>
              <Typography className={classes.cancleText}>CANCEL</Typography>
            </Box>
            <Box className={classes.confirmButton} onClick={handleOnClick}>
              <Typography className={classes.confirmText}>YES</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CancelAppointmentModal
