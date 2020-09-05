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

const useStyle = makeStyles(() => ({
  dialogBox: {
    height: 900,
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1000,
    },
  },
  header: {
    paddingTop: 15,
  },
  title: {
    paddingLeft: 335,
    fontSize: 20,
    color: '#504f4f',
  },
  icon: {
    marginLeft: 325,
    marginTop: -13,
    cursor: 'pointer',
    color: '#a8a8a8',
  },
  slotTimeBox: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  slotTime: {
    padding: '4px 36px',
    marginLeft: 260,
    backgroundColor: '#f7f7f7',
    width: 'fit-content',
    fontSize: 11,
    color: '#272424',
  },
  name: {
    fontSize: 13.5,
    color: '#9b9999',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  left: {
    width: 275,
  },
  right: {
    width: 275,
  },
  detail: {
    width: 600,
    marginLeft: 175,
  },
  detailField: {
    paddingTop: 10,
    paddingBottom: 7,
  },
  date: {
    paddingLeft: 175,
    '& div': {
      '& div': {
        '& input': {
          color: '#000000',
          fontWeight: 'bold',
        },
        '& svg': {
          fontSize: 20,
        },
      },
    },
  },
  available: {
    paddingLeft: 175,
    paddingTop: 15,
  },
  availableText: {
    fontSize: 15,
    color: '#a8a8a8',
  },
  availableSlots: {
    width: 510,
    maxHeight: 152,
    overflowY: 'auto',
    paddingTop: 5,
  },
  time: {
    width: 105,
    height: 35,
    backgroundColor: '#d5f7e3',
    textAlign: 'center',
    paddingTop: 8,
    marginTop: 10,
    marginRight: 19,
    '&:hover': {
      backgroundColor: '#54cbff',
    },
  },
  timeText: {
    fontSize: 13,
    color: '#16e46b',
    '&:hover': {
      color: '#ffffff',
    },
  },
  selectedTab: {
    backgroundColor: '#0bb5ff',
  },
  selectedText: {
    color: '#f7f7f7',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  submitbtn: {
    padding: '8px 35px',
    backgroundColor: '#0bb5ff',
    borderRadius: 17,
    textAlign: 'center',
    cursor: 'pointer',
  },
  submitText: {
    fontSize: 14,
    color: '#f7f7f7',
  },
  error: {
    textAlign: 'center',
    paddingBottom: 15,
    color: '#d51717',
  }
}))
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
    setSlotTime(slotTime)
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
                    return (
                      <Button
                        className={classNames(classes.time, {
                          [classes.selectedTab]: slotTime.start === data.start,
                        })}
                        onClick={() => handleOnClick(data)}
                        key={index}
                      >
                        <Typography
                          className={classNames(classes.timeText, {
                            [classes.selectedText]: slotTime.start === data.start,
                          })}
                        >
                          {getTimeFormatWithNoon(data.start)}
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
