import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'
import socketIOClient from 'socket.io-client'
import { setSocket, setTimer } from '../../../actions/patients'

import InfoCard from './InfoCard'
import usePermissions from '../../../hooks/usePermissions'
import WaitingPatientList from './WaitingPatientList'

const ENDPOINT = 'https://dev.virujh.com'

// const ENDPOINT = 'http://7fa3f203e6f9.ngrok.io/api/'

const userReadRoles = ['SELF_USER_SETTINGS_READ', 'ACCOUNT_USERS_SETTINGS_READ']

const useStyle = makeStyles(() => ({
  container: {
    height: 'calc(100% - 65px)',
    overflowY: 'auto',
  },
}))

function Doctors({ doctorList, setSocket, socket, setTimer, timer }) {
  const [isUserSettingsRead, isAccountUserSettingsRead] = usePermissions(
    userReadRoles
  )

  const classes = useStyle()

  const loginUser = localStorage.getItem('loginUser')

  const history = useHistory()

  const [patientList, setPatientList] = useState(null)

  const [open, setOpen] = useState(false)

  const [count, setCount] = useState(0)

  if (loginUser === 'doctor') {
    localStorage.setItem('doctorName', doctorList[0].doctorName)
  }

  useEffect(() => {
    if (localStorage.getItem('loginUser') === 'doctor') {
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
          socket.emit('updateLiveStatusOfUser', { status: 'online' })
        }

        const timer = setInterval(
          () => socket.emit('getAppointmentListForDoctor'),
          10000
        )

        socket.on('getDoctorAppointments', (data) => {
          // console.log('1', data, timer)
          setPatientList(data)
          setTimer(timer)
        })
      })
      setSocket(socket)
    }
  }, [])

  const readyPatient =
    patientList &&
    patientList.filter(
      (patient) => patient.patientLiveStatus === 'videoSessionReady'
    )

  useEffect(() => {
    if (readyPatient && readyPatient.length > 0 && count === 0) {
      setOpen(true)
    }
  }, [readyPatient])

  function handleJOinVideo(patient) {
    history.push({
      pathname: '/video-consultation',
      state: patient,
      isWaiting: true,
      socket: socket,
    })
  }

  return (
    <Box className={classes.container}>
      <Box display="flex" flexWrap="wrap">
        {doctorList.map((details, index) => {
          return (
            <InfoCard
              key={index}
              doctorDetails={details}
              isRead={isUserSettingsRead || isAccountUserSettingsRead}
            />
          )
        })}
      </Box>
      {readyPatient && (
        <WaitingPatientList
          open={open}
          patientList={readyPatient}
          setOpen={setOpen}
          handleJoinVideo={handleJOinVideo}
          setCount={setCount}
          timer={timer}
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctors)
