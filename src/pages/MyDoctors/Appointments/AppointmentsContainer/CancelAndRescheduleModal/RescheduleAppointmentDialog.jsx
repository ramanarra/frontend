import React, { useState, useMemo } from 'react'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import moment from 'moment'
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
// import DateFnsUtils from '@date-io/date-fns'
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import useCustomFecth from '../../../../../hooks/useCustomFetch'
import { URL, METHOD } from '../../../../../api'
import DatePicker from '../../../../../components/DatePicker'
import useStyle from './useRescheduleStyle'

function RescheduleAppointment({
  appointmentId,
  patientId,
  open,
  slotTime,
  onClose,
  details,
  onSave,
  dateChange,
  bookedBy,
  note,
}) {
  const classes = useStyle()

  const { id } = useParams()

  const [date, setDate] = useState(moment())

  const currentDate = moment(date).format('DD-MM-YYYY')

  const [time, setTime] = useState({ start: '00:00:00', end: '00:00:00' })

  const key = useMemo(() => {
    return {
      doctorKey: id,
      appointmentDate: currentDate,
    }
  }, [id, currentDate])

  const [availableSlots] = useCustomFecth(METHOD.GET, URL.availableSlot, key)

  const start = time.start.split(':')

  const end = time.end.split(':')

  const parameter = {
    appointmentId: appointmentId,
    patientId: Number(patientId),
    startTime: start[0] + ':' + start[1],
    endTime: end[0] + ':' + end[1],
    appointmentDate: moment(date).format('YYYY-MM-DD'),
  }

  function handleClose(event) {
    onClose(event)
  }

  function handleSubmit(event) {
    onClose(event)
    onSave(URL.appointmentReschedule, parameter)
  }

  const handleDateChange = (event) => {
    setDate(event)
  }

  const handleOnClick = (slotTiming) => {
    setTime(slotTiming)
  }

  return (
    <Box>
      <Dialog open={open} className={classes.rescheduled}>
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex">
            <Typography className={classes.title}>Reschedule</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.slot}>
            <Typography variant="h5" className={classes.text}>
              Your slot time {slotTime}
            </Typography>
          </Box>
          <Box display="flex" className={classes.details}>
            <Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.phoneNumber}>Phone Number</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.phone}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.firstName}>First Name</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.firstName}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.lastName}>Last Name</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.lastName}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.email}>Email ID</Typography>
                <Typography className={classes.notchedOutline}>
                  {details.patientDetails.email}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex">
            {bookedBy === 'Doctor' && (
              <StarIcon className={classes.starIcon} color="primary" />
            )}
            <Typography
              className={classNames(classes.note, {
                [classes.patientNote]: bookedBy === 'Patient',
              })}
            >
              {note}
            </Typography>
          </Box>
          <Box className={classes.date}>
           <DatePicker />
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
                      <Typography
                        className={classNames(classes.timeText, {
                          [classes.selectedText]: time.start === data.start,
                        })}
                      >
                        {times[0] + ':' + times[1]} AM
                      </Typography>
                    </Button>
                  ) : (
                    <Button
                      className={classNames(classes.time, {
                        [classes.selectedTab]: time.start === data.start,
                      })}
                      onClick={() => handleOnClick(data)}
                    >
                      <Typography
                        className={classNames(classes.timeText, {
                          [classes.selectedText]: time.start === data.start,
                        })}
                      >
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
