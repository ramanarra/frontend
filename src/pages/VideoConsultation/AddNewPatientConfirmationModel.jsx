import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import useStyle from './useNewPatientConfirmationStyle'

function AddNewPatientConfirmationModel({
  open,
  onClose,
  NextPatient,
  onPatientJoining,
  nextPatientDetails,
  byDoctor,
}) {
  const classes = useStyle()

  function handleClose() {
    onClose()
  }

  function handleSUbmit(status) {
    if (byDoctor) {
      onPatientJoining(
        nextPatientDetails.appointmentId,
        nextPatientDetails.firstName,
        nextPatientDetails.lastName,
        nextPatientDetails.index,
        status
      )
      onClose()
    } else {
      NextPatient(status)
      onClose()
    }
  }

  function handlePause(status) {
    if (byDoctor) {
      onPatientJoining(
        nextPatientDetails.appointmentId,
        nextPatientDetails.firstName,
        nextPatientDetails.lastName,
        nextPatientDetails.index,
        status
      )
      onClose()
    } else {
      NextPatient(status)
      onClose()
    }
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent>
          <Box className={classes.icon}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Box>
            <Typography className={classes.text} variant="h5">
              Finish consultation and join the next patient consultation.
            </Typography>
            <Box className={classes.buttons} display="flex">
              <Box className={classes.cancelButton} onClick={() => handlePause('paused')}>
                <Typography className={classes.cancelText}>PAUSE</Typography>
              </Box>
              <Box className={classes.cancelButton} onClick={handleClose}>
                <Typography className={classes.cancelText}>CANCEL</Typography>
              </Box>
              <Box className={classes.confirmButton} onClick={() => handleSUbmit('completed')}>
                <Typography className={classes.confirmText}>YES</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default AddNewPatientConfirmationModel
