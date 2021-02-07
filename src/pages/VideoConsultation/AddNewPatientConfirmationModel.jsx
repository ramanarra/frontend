import React from 'react'
import { connect } from 'react-redux'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import useStyle from './useNewPatientConfirmationStyle'
import {clearMessages,setPrescription,setIcon} from '../../actions/doctor'

function AddNewPatientConfirmationModel({
  open,
  onClose,
  NextPatient,
  onPatientJoining,
  nextPatientDetails,
  byDoctor,
  clearMessages,
  setPrescription,
  setIcon
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
      clearMessages([])
    } else {
      NextPatient(status)
      onClose()
      clearMessages([])
    }
  }

  function handlePause(status) {
    if (byDoctor) {
      let list = []
      setPrescription(list)
      setIcon(true)
      onPatientJoining(
       nextPatientDetails.appointmentId,
        nextPatientDetails.firstName,
        nextPatientDetails.lastName,
        nextPatientDetails.index,
        status
      )
      onClose()
      clearMessages([])
    } else {
      NextPatient(status)
      onClose()
      clearMessages([])
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
              <Box className={classes.pauseButton} onClick={() => handlePause('paused')}>
                <Typography className={classes.pauseText}>PAUSE</Typography>
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessages: (data) => dispatch(clearMessages(data)),
    setPrescription: (data) => dispatch(setPrescription(data)),
      setIcon:(data)=>dispatch(setIcon(data)),
  }
}

export default connect(null, mapDispatchToProps)(AddNewPatientConfirmationModel)
