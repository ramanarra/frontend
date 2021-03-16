import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import ScheduleIcon from '@material-ui/icons/Schedule'
import socketIOClient from 'socket.io-client'

import { setSocket, setTimer } from '../../actions/doctor'
import getTimeFormatWithNoon from '../../lib/dateLib'
import UpcomingAndPastView from './UpcomingAndPastView'
import CancelAppointmentModal from './CancelAppointmentModal'
import RescheduleAppointmentModal from './RescheduleAppointmentModal'
import useStyle from './usePatientAppointmentSlotStyle'
import { baseURL } from '../../baseURL'
import { useSelector, useDispatch } from 'react-redux'
import { setPatientAppointmentList, setPatientAppointment, setIsPast } from '../../actions/patient'

const ENDPOINT = baseURL

function PatientAppointmentSlot({
  appointmentDetail,
  borderColor,
  onSave,
  past,
  socket,
  setSocket,
  list,
}) {
  const classes = useStyle()

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const history = useHistory()

  const [openCancel, setOpenCancel] = useState(false)

  const [openReschedule, setOpenReschedule] = useState(false)

  // const [socket, setSocket] = useState(null)

  const location = useLocation()

  const month = moment(appointmentDetail.appointmentDate).format('MMMM')

  const date = moment(appointmentDetail.appointmentDate).format('DD')

  const appointmentDate = moment(appointmentDetail.appointmentDate).format(
    'DD/MM/YYYY'
  )

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

  function handleOnOpen(appointmentId) {
    history.push({
      pathname: '/video-consultation',
      state: appointmentId,
      socket: socket,
      appointmentDetail: appointmentDetail,
      doctorName: `${appointmentDetail.doctorFirstName}${' '}${doctorLastName}`,
      list: list,
    })
  }

  useEffect(() => {
    if (!past) {
      const socket = socketIOClient(ENDPOINT, {
        transports: ['websocket'],
        jsonp: false,
        query: {
          token: localStorage.getItem('virujhToken'),
        },
        path: '/socket.io',
      })

      socket.on('connect', function () {
        if (localStorage.getItem('loginUser') === 'doctor') {
          socket.emit('createTokenForDoctor')
        } else {
          if (!past) {
            socket.emit('updateLiveStatusOfUser', { status: 'online' })
            socket.emit('getPatientTokenForDoctor', appointmentDetail.appointmentId)
          }
        }

        socket.on('videoTokenForPatient', (data) => {
          if (data.isToken) {
            socket.emit('updateLiveStatusOfUser', { status: 'videoSessionReady' })
            if (data.appointmentId !== location.state) {
              handleOnOpen(data.appointmentId)
            }
          }
        })
      })

      setSocket(socket)
    }
  }, [])

  const handleOnClick = (data) => {
    localStorage.setItem('docKey', appointmentDetail.doctorKey)
    dispatch(setPatientAppointmentList(list))
    dispatch(setPatientAppointment(appointmentDetail))
    dispatch(setIsPast(past))
    history.push({
      pathname: `/patient/appoints/upcoming/appointmentDetail/${appointmentDetail.appointmentId}`,
      doctorKey: appointmentDetail.doctorKey,
      appointmentId: appointmentDetail.appointmentId,
    })

  }

  function handleOnClose(event) {
    setOpen(false)
    setOpenCancel(true)
    event.stopPropagation()
  }

  function handleOnCancel(event) {
    setOpen(false)
    event.stopPropagation()
  }

  function handleClose() {
    setOpenCancel(false)
  }

  function handleOnReschedule(event) {
    setOpen(false)
    setOpenReschedule(true)
    event.stopPropagation()
  }

  function handleCloseReschedule() {
    setOpenReschedule(false)
  }

  return (
    <Box className={classes.topContainer}>
      <Box
        className={classes.container}
        style={{ borderLeft: `3px solid ${borderColor}` }}
        onClick={handleOnClick.bind(this, appointmentDetail.appointmentId, appointmentDetail.doctorKey)}
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
            <Typography className={classes.name} variant="h5">{`${'Dr. '}${appointmentDetail.doctorFirstName
              } ${doctorLastName} `}</Typography>
            <Typography className={classes.hospitalName}>
              {appointmentDetail.hospitalName}
            </Typography>
          </Box>
        </Box>
      </Box>

      {openCancel && (
        <CancelAppointmentModal
          open={openCancel}
          time={startTime}
          date={appointmentDate}
          onClose={handleClose}
          appointmentId={appointmentDetail.appointmentId}
          onSave={onSave}
        />
      )}
      {openReschedule && (
        <RescheduleAppointmentModal
          open={openReschedule}
          onClose={handleCloseReschedule}
          time={startTime}
          date={appointmentDate}
          appointmentDetail={appointmentDetail}
          onSave={onSave}
        />
      )}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.doctor.socket,
    timer: state.doctor.timer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTimer: (data) => dispatch(setTimer(data)),
    setSocket: (data) => dispatch(setSocket(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointmentSlot)
