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

import useCustomFecth from '../../../../../hooks/useCustomFetch'
import { URL, METHOD } from '../../../../../api'
import DatePicker from '../../../../../components/DatePicker'
import useStyle from './useRescheduleStyle'
import getTimeFormatWithNoon from '../../../../../lib/dateLib'
import ConfirmationModal from './ConfirmationModal'

function RescheduleAppointment({
  appointmentId,
  patientId,
  open,
  slotTime,
  onClose,
  onSave,
  bookedBy,
  note,
  phone,
  firstName,
  lastName,
  email,
  setOpenConfirmation,
  setParameter,
  openConfirmation,
}) {
  const classes = useStyle()

  const { id } = useParams()

  const [date, setDate] = useState(moment())

  const currentDate = moment(date).format('YYYY-MM-DD')

  const [time, setTime] = useState({ start: '', end: '' })

  const [show, setShow] = useState(false)

  const [confirmation, setConfirmation] = useState(true)

  const key = useMemo(() => {
    return {
      doctorKey: id,
      appointmentDate: currentDate,
      confirmation: confirmation
    }
  }, [id, currentDate, confirmation])

  const [availableSlots] = useCustomFecth(METHOD.POST, URL.availableSlot, key, true)

  function handleClose(event) {
    onClose(event)
  }

  function handleSubmit(event) {
    if(time.start === '00:00:00' && time.end === '00:00:00') {
      setShow(true)
    }

    else {
      onClose(event)
      const parameter = {
        appointmentId: appointmentId,
        patientId: Number(patientId),
        startTime: moment(time.start, 'HH:mm:ss').format('HH:mm'),
        endTime: moment(time.end, 'HH:mm:ss').format('HH:mm'),
        appointmentDate: moment(date).format('YYYY-MM-DD'),
        confirmation: true,
      }
      setOpenConfirmation(true)
      setParameter(parameter)
    }
  }

  const handleDateChange = (event) => {
    setDate(event)
    setConfirmation(false)
  }

  const handleOnClick = (slotTiming) => {
    if(show) {
      setShow(false)
    }
    setTime({start: slotTiming.startTime, end: slotTiming.endTime})
  }

  return (
    <Box>
      <Dialog open={open} className={classes.rescheduled}>
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex">
            <Typography className={classes.title} variant="h5">
              Reschedule
            </Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.slot}>
            <Typography variant="h5" className={classes.text}>
              {`Your slot time ${slotTime}`}
            </Typography>
          </Box>
          <Box display="flex" className={classes.details}>
            <Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.phoneNumber}>
                  Phone Number
                </Typography>
                <Typography className={classes.notchedOutline}>{phone}</Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.firstName}>
                  First Name
                </Typography>
                <Typography className={classes.notchedOutline}>
                  {firstName}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.lastName}>
                  Last Name
                </Typography>
                <Typography className={classes.notchedOutline}>
                  {lastName}
                </Typography>
              </Box>
              <Box display="flex">
                <Typography variant="h5" className={classes.email}>
                  Email ID
                </Typography>
                <Typography className={classes.notchedOutline}>{email}</Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" className={classes.noteText}>
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
            {
              availableSlots?.date &&
              <DatePicker
              name={'Select Your Date'}
              dateChange={handleDateChange}
              value={moment(availableSlots.date)}
              width={236}
              fontSize={12}
              disablePast={true}
            />
            }
          </Box>
          <Box className={classes.available}>
            <Typography className={classes.availableText} variant="h5">
              Available Time Slots:
            </Typography>
            <Box display="flex" flexWrap="wrap" className={classes.availableSlots}>
              {availableSlots?.slots &&
                availableSlots.slots.map((data, index) => {
                  return (
                    <Button
                      className={classNames(classes.time, {
                        [classes.selectedTab]: time.start === data.startTime,
                      })}
                      onClick={() => handleOnClick(data)}
                      key={index}
                    >
                      <Typography
                        className={classNames(classes.timeText, {
                          [classes.selectedText]: time.start === data.startTime,
                        })}
                      >
                        {getTimeFormatWithNoon(data.startTime)}
                      </Typography>
                    </Button>
                  )
                })}
            </Box>
          </Box>
        </DialogContent>
        <Box display="flex" className={classes.button}>
          <Box className={classes.submitbtn} onClick={handleSubmit}>
            <Typography className={classes.submitText}>SUBMIT</Typography>
          </Box>
        </Box>
        {
          show &&
          <Typography className={classes.error}>Please select any free slot</Typography>
        }
      </Dialog>
    </Box>
  )
}

export default RescheduleAppointment
