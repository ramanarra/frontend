import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import socketIOClient from 'socket.io-client'

import InfoCard from './InfoCard'
import usePermissions from '../../../hooks/usePermissions'
import WaitingPatientList from './WaitingPatientList'


const ENDPOINT = 'https://dev.virujh.com'

const userReadRoles = ['SELF_USER_SETTINGS_READ', 'ACCOUNT_USERS_SETTINGS_READ']

function Doctors({ doctorList }) {
  const [isUserSettingsRead, isAccountUserSettingsRead] = usePermissions(
    userReadRoles
  )

  const loginUser = localStorage.getItem('loginUser')

  const history = useHistory()

  const [patientList, setPatientList] = useState(null)

  const [socket, setSocket] = useState(null)

  const [isJoinDisabled, setIsJoinDisabled] = useState(null)

  const [sessionID, setSessionID] = useState(null)

  const [token, setToken] = useState(null)

  const [open, setOpen] = useState(false)

  const [count, setCount] = useState(0)

  if (loginUser === 'doctor') {
    localStorage.setItem('doctorName', doctorList[0].doctorName)
  }

  useEffect(() => {
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
      }

      socket.emit('getAppointmentListForDoctor')

      socket.on('getDoctorAppointments', (data) => {
        setPatientList(data)
      })
      socket.on('videoTokenForDoctor', (data) => {
        if (data.isToken) {
          setIsJoinDisabled(false)
          setSessionID(data.sessionId)
          setToken(data.token)
        }
      })
    })
    setSocket(socket)
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
    <Box>
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
        />
      )}
    </Box>
  )
}

export default Doctors
