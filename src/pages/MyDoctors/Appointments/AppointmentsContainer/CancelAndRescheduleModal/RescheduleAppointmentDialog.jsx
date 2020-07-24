import React, { useState } from 'react'
import classNames from 'classnames'
import {
  Typography,
  Box,
  DialogContent,
  Dialog,
  DialogTitle,
  Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import useStyle from './useStyleForReschedule'
import moment from 'moment'
import { URL } from '../../../../../api'

function RescheduleAppointment({
  appointmentId,
  patientId,
  open,
  slotTime,
  onClose,
  details,
  onSave,
  availableSlots,
  dateChange,
}) {
  const classes = useStyle()

  const today = moment().format('MM/DD/yyyy')

  const [time, setTime] = useState({start: '00:00:00', end: '00:00:00'})

  const start = time.start.split(':')

  const end = time.end.split(':')

  const [date, setDate] = useState(today)

  const parameter = {
    appointmentId: appointmentId,
    patientId: Number(patientId),
    startTime: start[0] + ':' + start[1],
    endTime: end[0] + ':' + end[1],
    appointmentDate: moment(date).format('YYYY-MM-DD')
  }

  function handleClose(event) {
    onClose(event)
  }

  function handleSubmit(event) {
    onClose(event)
    onSave(URL.appointmentReschedule, parameter)
  }

  const handleDateChange = (event) => {
    dateChange(event)
    setDate(event)
  }


  const handleOnClick = (slotTiming) => {
    setTime(slotTiming)
  }

  return (
    <Box>
      <Dialog open={open} className={classes.rescheduled}>
        <DialogTitle>
          <Box display="flex">
            <Typography className={classes.title}>Reschedule</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.slot}>
            <Typography className={classes.text}>
              Your slot time {slotTime}
            </Typography>
          </Box>
          <Box display="flex" className={classes.details}>
            <Box>
              <Box display="flex">
                <Typography className={classes.phoneNumber}>Phone Number</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.phone}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography className={classes.firstName}>First Name</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.firstName}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box display="flex">
                <Typography className={classes.lastName}>Last Name</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.lastName}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography className={classes.email}>Email ID</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex">
            <StarIcon className={classes.starIcon} color="primary" />
            <Typography className={classes.note}>
              Doctor Booked appointment (payment through online) - yet to pay
            </Typography>
          </Box>
          <Box className={classes.date}>
            <Typography className={classes.dateText}>Select Your Date</Typography>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              className={classes.datePicker}
            >
              <KeyboardDatePicker
                disableToolbar
                className={classes.datePicker}
                variant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box className={classes.available}>
            <Typography className={classes.availableText}>
              Available Time Slots:
            </Typography>
            <Box display="flex" flexWrap="wrap">
              {availableSlots &&
                availableSlots.map((data) => {
                  const times = data.start.split(':')
                  return times[0] < 12 ? (
                    <Button
                      className={classNames(classes.time, {
                        [classes.selectedTab]: time.start === data.start,
                      })}
                      onClick={() => handleOnClick(data)}
                    >
                      <Typography className={classNames(classes.timeText, {
                      [classes.selectedText]: time.start === data.start,
                    })}>
                        {times[0] + ':' + times[1]} AM
                      </Typography>
                    </Button>
                  ) : (
                    <Button className={classNames(classes.time, {
                      [classes.selectedTab]: time.start === data.start,
                    })}
                     onClick={() => handleOnClick(data)}>
                      <Typography className={classNames(classes.timeText, {
                      [classes.selectedText]: time.start === data.start,
                    })}>
                        {times[0] + ':' + times[1]} PM
                      </Typography>
                    </Button>
                  )
                })}
            </Box>
          </Box>
        </DialogContent>
        <Box display="flex">
          <Box className={classes.submitbtn} onClick={handleSubmit}>
            <Typography className={classes.submitText}>SUBMIT</Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  )
}

export default RescheduleAppointment
