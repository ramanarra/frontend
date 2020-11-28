import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import useStyle from './useOverBookingStyle'

function OverBooking({ openDialog, onclose, onSubmit, overBookingConfirmation }) {
  const classes = useStyle()

  function handleOnSubmit(event) {
    overBookingConfirmation(true)
    onSubmit()
    onclose(event)
  }

  function handleOnCancel(event) {
    onclose(event)
  }

  return (
    <Box>
      <Dialog open={openDialog} className={classes.overBooking}>
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex">
            <Typography className={classes.titleText} variant="h5">Confirmation</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleOnCancel} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.content}>
            <Typography className={classes.confirmationText}>
              Are you sure want to book another appointment on this date?
            </Typography>
            <Box display="flex">
              <StarIcon className={classes.confirmationStar} />
              <Typography className={classes.note}>
                Appointment already present on this date
              </Typography>
            </Box>
          </Box>
          <Box display="flex" className={classes.buttons}>
            <Box className={classes.cancleButton} onClick={handleOnCancel}>
              <Typography className={classes.cancleText}>NO</Typography>
            </Box>
            <Box className={classes.confirmButton} onClick={handleOnSubmit}>
              <Typography className={classes.confirmText}>YES</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default OverBooking
