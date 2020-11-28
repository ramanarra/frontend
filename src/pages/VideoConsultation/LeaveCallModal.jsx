import React from 'react'
import { connect } from 'react-redux'
import { Box, Dialog, DialogContent, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import useStyle from './useLeaveCallStyle'
import { setSelectedAppointmentId } from '../../actions/doctor'

function LeaveCallModal({
  open,
  setOpenLeaveModal,
  onLeaveSession,
  patientAppointmentId,
  setSelectedAppointmentId,
}) {
  const classes = useStyle()

  function handleClose() {
    setOpenLeaveModal(false)
  }

  function handleSUbmit(status) {
    onLeaveSession(status)
    setOpenLeaveModal(false)
    setSelectedAppointmentId(null)
  }

  function handlePause(status) {
    onLeaveSession(status)
    setOpenLeaveModal(false)
    setSelectedAppointmentId(null)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent>
          <Box className={classes.icon}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Box>
            {patientAppointmentId && (
              <Typography className={classes.text} variant="h5">
                Finish Consultation and leave the call
              </Typography>
            )}
            <Typography className={classes.text} variant="h5">
              Are you sure want to leave the call?
            </Typography>
            <Box className={classes.buttons} display="flex">
              <Box
                className={classes.pauseButton}
                onClick={() => handlePause('paused')}
              >
                <Typography className={classes.pauseText}>PAUSE</Typography>
              </Box>
              <Box className={classes.cancelButton} onClick={handleClose}>
                <Typography className={classes.cancelText}>CANCEL</Typography>
              </Box>
              <Box
                className={classes.confirmButton}
                onClick={() => handleSUbmit('completed')}
              >
                <Typography className={classes.confirmText}>YES</Typography>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveCallModal)
