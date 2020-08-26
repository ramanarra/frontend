import React, { useState } from 'react'
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import { URL } from '../../../../../api'
import useStyle from './useCancleAppointmentStyle'

function CancleAppointment({
  open,
  slotTime,
  onClose,
  id,
  onSave,
  doubleStar,
  cancellationNote,
}) {
  const classes = useStyle()

  const [checked, setChecked] = useState(false)

  const slotDate = slotTime.split(' ')

  function handleClose(event) {
    onClose(event)
  }

  function checkConfimation(event) {
    setChecked(event.target.checked)
  }

  function handleConfimation(event) {
    onClose(event)
    const params = {
      appointmentId: id,
      confirmation: checked,
    }
    onSave(URL.appointmentCancel, params)
  }

  function handleConfirmationCancle(event) {
    onClose(event)
  }

  return (
    <Box>
      <Dialog open={open} className={classes.cancellation}>
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex">
            <Typography variant="h5" className={classes.confirmation}>
              Confirmation
            </Typography>
            <CloseIcon className={classes.closed} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.askConfirmation}>
            <Typography className={classes.askConfirmationText}>
              {`Are you sure do you want to cancel your appointment ${slotDate[1]} ${slotDate[2]} ${slotDate[0]} ?`}
            </Typography>
          </Box>
          <Box>
            {doubleStar && (
              <Box display="flex">
                <Checkbox className={classes.checkBox} onChange={checkConfimation} />
                <Typography className={classes.checkBoxText}>
                  Patient can reschdule this appointment for free
                </Typography>
              </Box>
            )}
          </Box>
          <Box display="flex" className={classes.notes}>
            <StarIcon className={classes.confirmationStar} />
            <Typography variant="h5" className={classes.confirmationNote}>
              {cancellationNote}
            </Typography>
          </Box>
        </DialogContent>
        <Box display="flex" className={classes.buttons}>
          <Box className={classes.cancleButton} onClick={handleConfirmationCancle}>
            <Typography className={classes.cancleText}>NO</Typography>
          </Box>
          <Box className={classes.confirmButton} onClick={handleConfimation}>
            <Typography className={classes.confirmText}>YES</Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default CancleAppointment
