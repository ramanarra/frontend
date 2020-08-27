import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { URL } from '../../api'

const useStyle = makeStyles(() => ({
  content: {
    width: 440,
  },
  icon: {
    marginLeft: 380,
    color: '#a8a8a8',
  },
  heading: {
    fontSize: 20,
    color: '#686868',
  },
  text: {
    paddingTop: 15,
    color: '#a8a8a8',
  },
  button: {
    justifyContent: 'flex-end',
    paddingTop: 18,
    paddingBottom: 25,
  },
  cancleButton: {
    padding: '10px 40px',
    borderRadius: 17,
    backgroundColor: '#f4f2f2',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: 16,
  },
  cancleText: {
    color: '#a8a8a8',
    fontSize: 12,
  },
  confirmButton: {
    padding: '10px 40px',
    borderRadius: 17,
    backgroundColor: '#0bb5ff',
    textAlign: 'center',
    cursor: 'pointer',
  },
  confirmText: {
    color: 'white',
    fontSize: 12,
  },
}))

function CancelAppointmentModal({ open, time, date, onClose, appointmentId, onSave }) {
  const classes = useStyle()

  function handleOnClose() {
    onClose()
  }

  function handleOnClick() {
    onSave(URL.patientAppointmentCancel, {appointmentId: appointmentId})
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
