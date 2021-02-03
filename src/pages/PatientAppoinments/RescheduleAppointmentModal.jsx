import React, { useMemo, useState } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import DatePicker from '../../components/DatePicker'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import getTimeFormatWithNoon from '../../lib/dateLib'
import useStyle from './useRescheduleAppointmentStyle'

function RescheduleAppointmentModal({
  open,
  onClose,
  time,
  date,
  appointmentDetail,
  onSave,
}) {
  const classes = useStyle()

  const [confirmation, setConfirmation] = useState(true)

  const [slotDate, setSlotDate] = useState(moment())

  const currentDate = moment(slotDate).format('YYYY-MM-DD')

  const [slotTime, setSlotTime] = useState({ start: '00:00:00', end: '00:00:00' })

  const [show, setShow] = useState(false)

  let todayDate = moment().format('YYYY-MM-DD')

  let currentTime = moment().format('HH:mm:ss')

  const key = useMemo(() => {
    return {
      doctorKey: appointmentDetail.doctorKey,
      appointmentId: appointmentDetail.appointmentId,
    }
  }, [appointmentDetail])

  const [doctorDetails] = useCustomFecth(
    METHOD.GET,
    URL.appointmentDoctorDetails,
    key
  )

  const params = useMemo(() => {
    return {
      doctorKey: appointmentDetail.doctorKey,
      appointmentDate: currentDate,
      confirmation: confirmation,
    }
  }, [appointmentDetail.doctorKey, currentDate, confirmation])

  const [availableSlots] = useCustomFecth(
    METHOD.POST,
    URL.patientAppointmentSlotsView,
    params
  )

  function handleOnClose() {
    onClose()
  }

  function handleDateChange(event) {
    setSlotDate(event)
    setConfirmation(false)
  }

  function handleSubmit() {
    onClose()
  }

  function handleOnClick(slotTime) {
    if(show) {
      setShow(false)
    }
    setSlotTime({start: slotTime.startTime, end: slotTime.endTime})
  }

  function handleSubmit(event) {
    if (slotTime.start === '00:00:00' && slotTime.end === '00:00:00') {
      setShow(true)
    } else {
      onClose(event)
      const parameter = {
        appointmentId: appointmentDetail.appointmentId,
        patientId: Number(doctorDetails.patientId),
        startTime: moment(slotTime.start, 'HH:mm:ss').format('HH:mm'),
        endTime: moment(slotTime.end, 'HH:mm:ss').format('HH:mm'),
        appointmentDate: moment(slotDate).format('YYYY-MM-DD'),
        confirmation: true,
      }
      onSave(URL.patientAppointmentReschedule, parameter)
    }
  }

  return (
    <Box>
      {doctorDetails && (
        <Dialog open={open} className={classes.dialogBox}>
          <DialogContent>
            <Box display="flex" className={classes.header}>
              <Typography className={classes.title} variant="h5">
                Reschedule
              </Typography>
              <CloseIcon className={classes.icon} onClick={handleOnClose} />
            </Box>
            <Box className={classes.slotTimeBox}>
              <Typography
                className={classes.slotTime}
                variant="h5"
              >{`${'Your slot time '}  ${date}  ${time}`}</Typography>
            </Box>
            <Box display="flex" className={classes.detail}>
              <Box className={classes.left}>
                <Box display="flex" className={classes.detailField}>
                  <Typography className={classes.name}>Email:</Typography>
                  <Typography className={classes.value}>
                    {doctorDetails.email}
                  </Typography>
                </Box>
                <Box display="flex" className={classes.detailField}>
                  <Typography className={classes.name}>
                    Invited Time Zone:
                  </Typography>
                  <Typography className={classes.value}>
                    Indian Standard Time
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.right}>
                <Box display="flex" className={classes.detailField}>
                  <Typography className={classes.name}>Location:</Typography>
                  <Typography className={classes.value}>
                    {doctorDetails.location}
                  </Typography>
                </Box>
                <Box display="flex" className={classes.detailField}>
                  <Typography className={classes.name}>Mobile No:</Typography>
                  <Typography className={classes.value}>
                    {doctorDetails.mobileNo}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={classes.date}>
              {availableSlots?.date && (
                <DatePicker
                  dateChange={handleDateChange}
                  value={moment(availableSlots.date)}
                  width={236}
                  fontSize={12}
                  disablePast={true}
                />
              )}
            </Box>
            <Box className={classes.available}>
              <Typography className={classes.availableText} variant="h5">
                Available Time Slots:
              </Typography>
              <Box display="flex" flexWrap="wrap" className={classes.availableSlots}>
                {availableSlots?.slots &&
                  availableSlots.slots.map((data, index) => {
                    let show = todayDate === currentDate ?
                                  data.startTime > currentTime ? true : false
                                  : true
                    return (
                      show &&
                      <Button
                        className={classNames(classes.time, {
                          [classes.selectedTab]: slotTime.start === data.startTime,
                        })}
                        onClick={() => handleOnClick(data)}
                        key={index}
                      >
                        <Typography
                          className={classNames(classes.timeText, {
                            [classes.selectedText]: slotTime.start === data.startTime,
                          })}
                        >
                          {getTimeFormatWithNoon(data.startTime)}
                        </Typography>
                      </Button>
                    )
                  })}
              </Box>
            </Box>
            <Box display="flex" className={classes.button}>
              <Box className={classes.submitbtn} onClick={handleSubmit}>
                <Typography className={classes.submitText}>SUBMIT</Typography>
              </Box>
            </Box>
            {show && (
              <Typography className={classes.error}>
                Please select any free slot
              </Typography>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  )
}

export default RescheduleAppointmentModal
