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
    padding: '11px 8px 30px 30px',
    boxShadow: '5px 0px 15px 0px #f3eeee',
    marginBottom: 20,
    marginRight: 12,
    cursor: 'pointer',
  },
  timing: {
    justifyContent: 'flex-end',
    paddingRight: 10,
    color: '#a8a8a8',
  },
  scheduleIcon: {
    width: 18,
    marginRight: 5,
    marginTop: -1,
  },
  time: {
    fontSize: 15,
  },
  date: {
    fontSize: 53,
    letterSpacing: 2,
  },
  month: {
    fontSize: 20,
    paddingLeft: 8,
    letterSpacing: 0.5,
    variant: 'h5',
  },
  doctorDetails: {
    paddingLeft: 42,
    paddingTop: 9,
  },
  name: {
    variant: 'h5',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  hospitalName: {
    paddingTop: 6,
    fontSize: 15,
    color: '#8c8a8a',
    letterSpacing: 0.5,
  },
  infoIcon: {
    width: 17,
    color: '#37befa',
    marginTop: 6,
    marginLeft: -3,
  },
  preConsultaion: {
    paddingTop: 7,
    paddingLeft: 3,
    fontSize: 15,
    color: '#37befa',
    letterSpacing: 0.5,
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
      .format('hh:mm A')
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
            <Typography className={classes.month} variant="h2">
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
                  Preconsultaion starts at <b>{preConsultaionTime}</b>. Doctor
                  consultation at <b>{startTime}</b>
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
