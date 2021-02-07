import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { URL } from '../../../../../api'

const useStyle = makeStyles(() => ({
  heading: {
    fontSize: 20,
    color: '#524646',
  },
  closeIcon: {
    marginLeft: 328,
    cursor: 'pointer',
    marginRight: -10,
  },
  text: {
    paddingTop: 10,
    width: 450,
    color: '#a8a8a8',
    fontSize: 15,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 190,
    paddingTop: 18,
    paddingBottom: 15,
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

function ConfirmationModal({ open, onClose, parameter, slotTime, onSave }) {
  const classes = useStyle()

  const slotDate = slotTime.split(' ')

  function handleConfirmationCancle(event) {
    onClose(event)
  }

  function handleConfimation() {
    onSave(URL.appointmentReschedule, parameter)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent>
          <Box display="flex" className={classes.header}>
            <Typography className={classes.heading} variant="h5">Confirmation</Typography>
            <CloseIcon
              onClick={handleConfirmationCancle}
              className={classes.closeIcon}
            />
          </Box>
          <Box>
            <Typography className={classes.text}>
              {`Are you sure do you want to reschedule your appointment ${slotDate[1]} ${slotDate[2]} ${slotDate[0]} ?`}
            </Typography>
          </Box>
          <Box display="flex" className={classes.buttons}>
            <Box className={classes.cancleButton} onClick={handleConfirmationCancle}>
              <Typography className={classes.cancleText}>NO</Typography>
            </Box>
            <Box className={classes.confirmButton} onClick={handleConfimation}>
              <Typography className={classes.confirmText}>YES</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ConfirmationModal
