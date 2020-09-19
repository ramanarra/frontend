import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import useStyle from './useLeaveCallStyle'

function LeaveCallModal({ open, setOpenLeaveModal, onLeaveSession }) {
  const classes = useStyle()

  function handleClose() {
    setOpenLeaveModal(false)
  }

  function handleSUbmit(status) {
    onLeaveSession(status)
    setOpenLeaveModal(false)
  }

  function handlePause(status) {
    onLeaveSession(status)
    setOpenLeaveModal(false)
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
              Finish Consultation and leave the call
            </Typography>
            <Typography className={classes.text} variant="h5">
              Are you sure want to leave the call?
            </Typography>
            <Box className={classes.buttons} display="flex">
              <Box
                className={classes.cancelButton}
                onClick={() => handlePause('paused')}
              >
                <Typography className={classes.cancelText}>PAUSE</Typography>
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

export default LeaveCallModal
