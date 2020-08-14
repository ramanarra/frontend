import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import { URL } from '../../../../../api'

const useStyle = makeStyles(() => ({
  dialogTitle: {
    padding: '20px 24px 10px',
  },
  overBooking: {
    height: 950,
  },
  titleText: {
    fontSize: 20,
    color: '#524646',
    variant: 'h5',
  },
  closeIcon: {
    marginLeft: 285,
    marginRight: -10,
    cursor: 'pointer',
  },
  content: {
    width: 400,
  },
  confirmationText: {
    fontSize: 18,
    color: '#898989',
  },
  note: {
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 4,
    color: '#545252',
  },
  confirmationStar: {
    width: 7,
    color: 'red',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 190,
    paddingTop: 18,
    paddingBottom: 20,
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

function OverBooking({ open, onCloseDialog, data, onSave }) {
  const classes = useStyle()

  const patientDetails = JSON.parse(data)

  function handleOnSubmit(event) {
    const params = {
      patientId: patientDetails.patientId,
      startTime: patientDetails.startTime,
      endTime: patientDetails.endTime,
      appointmentDate: patientDetails.appointmentDate,
      paymentOption: patientDetails.paymentOption,
      consultationMode: patientDetails.consultationMode,
      doctorKey: patientDetails.doctorKey,
      confirmation: true,
    }
    onSave(URL.createAppointment, params)
    onCloseDialog(event)
  }

  function handleOnCancel(event) {
    onCloseDialog(event)
  }

  return (
    <Box>
      <Dialog open={open} className={classes.overBooking}>
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
