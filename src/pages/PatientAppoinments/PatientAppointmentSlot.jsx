import React, { useState } from 'react'
import moment from 'moment'
import { Box, makeStyles, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import getTimeFormatWithNoon from '../../lib/dateLib'
import UpcomingAndPastView from './UpcomingAndPastView'

const useStyle = makeStyles(() => ({
  container: {
    width: 675,
    background: '#f9f9f9',
    backgroundColor: 'white',
    height: 150,
    boxShadow: '5px 0px 15px 0px #f3eeee',
    marginBottom: 20,
    marginRight: 12,
    cursor: 'pointer',
  },
  timing: {
    paddingLeft: 500,
    paddingTop: 11,
    color: '#a8a8a8',
  },
  scheduleIcon: {
    width: 18,
    marginRight: 5,
  },
  time: {
    // paddingLeft: 5,
  },
  dateAndMonth: {
    paddingLeft: 30,
  },
  date: {
    fontSize: 52,
    letterSpacing: 2,
  },
  month: {
    fontSize: 22,
    paddingLeft: 8,
    letterSpacing: 0.5,
  },
  doctorDetails: {
    paddingLeft: 42,
    paddingTop: 12,
  },
  name: {
    variant: 'h5',
    fontSize: 17.5,
  },
  hospitalName: {
    paddingTop: 5,
    color: '#8c8a8a',
  },
  infoIcon: {
    width: 18,
    color: '#37befa',
    marginTop: 5,
  },
  preConsultaion: {
    paddingTop: 5,
    paddingLeft: 3,
    color: '#37befa',
  },
}))
function PatientAppointmentSlot({ appointmentDetail, borderColor }) {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const month = moment(appointmentDetail.appointmentDate).format('MMMM')

  const date = moment(appointmentDetail.appointmentDate).format('DD')

  const startTime = getTimeFormatWithNoon(appointmentDetail.startTime)

  const endTime = getTimeFormatWithNoon(appointmentDetail.endTime)

  const doctorLastName = appointmentDetail.doctorLastName
    ? appointmentDetail.doctorLastName
    : ''

  const preConsultaion = `${appointmentDetail.preConsultationHours}${':'}${
    appointmentDetail.preConsultationMins
  }`

  const preConsultaionTime = getTimeFormatWithNoon(
    moment
      .utc(
        moment(appointmentDetail.startTime, 'hh:mm').diff(
          moment(preConsultaion, 'hh:mm')
        )
      )
      .format('hh:mm')
  )

  function handleOnClick() {
    setOpen(true)
  }

  function handleOnClose(event) {
    setOpen(false)
    event.stopPropagation()
  }

  return (
    <Box>
      <Box
        className={classes.container}
        style={{ borderLeft: `3px solid ${borderColor}` }}
        onClick={handleOnClick}
      >
        <Box className={classes.timing} display="flex">
          <ScheduleIcon className={classes.scheduleIcon} />
          <Typography
            className={classes.time}
          >{`${startTime}${'-'}${endTime}`}</Typography>
        </Box>
        <Box display="flex">
          <Box className={classes.dateAndMonth}>
            <Typography className={classes.date} variant="h3">
              {date}
            </Typography>
            <Typography className={classes.month} variant="h3">
              {month}
            </Typography>
          </Box>
          <Box className={classes.doctorDetails}>
            <Typography className={classes.name} variant="h5">{`${'Dr. '}${
              appointmentDetail.doctorFirstName
            } ${doctorLastName} `}</Typography>
            <Typography className={classes.hospitalName}>
              {appointmentDetail.hospitalName}
            </Typography>
            {appointmentDetail.preConsultationHours && (
              <Box display="flex">
                <InfoOutlinedIcon className={classes.infoIcon} />
                <Typography className={classes.preConsultaion}>
                  PreConsultaion starts at <b>{preConsultaionTime}</b>. Doctor
                  consultation starts at <b>{startTime}</b>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {open && (
        <UpcomingAndPastView
          appointmentDetail={appointmentDetail}
          open={open}
          startTime={startTime}
          endTime={endTime}
          preConsultationTime={preConsultaionTime}
          onClose={handleOnClose}
        />
      )}
    </Box>
  )
}

export default PatientAppointmentSlot
