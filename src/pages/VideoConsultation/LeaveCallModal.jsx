import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyle = makeStyles(() => ({
  icon: {
    textAlign: 'end',
    paddingTop: 20,
  },
  closeIcon: {
    cursor: 'pointer',
    marginRight: -12,
    color: '#a8a8a8',
  },
  text: {
    fontSize: 19,
    paddingTop: 15,
    color: '#4f4f4f',
  },
  buttons: {
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  cancelButton: {
    padding: '8.5px 26px',
    borderRadius: 20,
    backgroundColor: '#e1e0e0',
    marginRight: 15,
    cursor: 'pointer',
  },
  cancelText: {
    fontSize: 12,
    color: '#a8a8a8',
  },
  confirmButton: {
    padding: '8.5px 38px',
    borderRadius: 20,
    backgroundColor: '#0eabff',
    cursor: 'pointer',
  },
  confirmText: {
    fontSize: 12,
    color: '#f7f7f7',
  },
}))

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
