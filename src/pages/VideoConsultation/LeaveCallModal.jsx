import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Box, Dialog, DialogContent, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import useStyle from './useLeaveCallStyle'
import {
  setPrescription,
  setSelectedAppointmentId,
  setIcon,
} from '../../actions/doctor'
import { data } from 'jquery'

function LeaveCallModal({
  open,
  setOpenLeaveModal,
  onLeaveSession,
  patientAppointmentId,
  setSelectedAppointmentId,
  setPrescription,
  setIcon,
  socket,
  patientName,
}) {
  const classes = useStyle()

  function handleClose() {
    setOpenLeaveModal(false)
  }

  function handleSUbmit(status) {
    let list = []
    setPrescription(list)
    onLeaveSession(status)
    setOpenLeaveModal(false)
    setSelectedAppointmentId(null)
    setIcon(true)
  }

  function handlePause(status) {
    !!patientAppointmentId &&
      socket.emit('emitPauseStatus', { appointmentId: patientAppointmentId })

    let list = []
    setPrescription(list)
    onLeaveSession(status)
    setOpenLeaveModal(false)
    setSelectedAppointmentId(null)
    setIcon(true)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent>
          <Box className={classes.icon}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Box>
            {patientAppointmentId ? (
              <Typography className={classes.text} variant="h5">
                Is your Appoinment/Consultation with {patientName} is Completed?
              </Typography>
            ) : (
              <Typography className={classes.text} variant="h5">
                Do you want to leave video conference ?
              </Typography>
            )}

            <Box className={classes.buttons} display="flex">
              <Box
                className={classes.confirmButton}
                onClick={() => handleSUbmit('completed')}
              >
                <Typography className={classes.confirmText}>
                  Yes,Completed
                </Typography>
              </Box>
              <Box
                className={classes.pauseButton}
                onClick={() => handlePause('paused')}
              >
                <Typography className={classes.pauseText}>
                  No, Some Issue Need to join again!
                </Typography>
              </Box>

              <Box className={classes.cancelButton} onClick={handleClose}>
                <Typography className={classes.cancelText}>Stay here!</Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    patientAppointmentId: state.doctor.patientAppointmentId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedAppointmentId: (data) => dispatch(setSelectedAppointmentId(data)),
    setPrescription: (data) => dispatch(setPrescription(data)),
    setIcon: (data) => dispatch(setIcon(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveCallModal)
