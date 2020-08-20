import React, { useState, useEffect, Fragment } from 'react'
import socketIOClient from 'socket.io-client'

import ConfirmationModal from './ConfirmationModel'
import Video from './Video'

const ENDPOINT = 'https://dev.virujh.com'

function VideoConsulation() {
  const [open, setOpen] = useState(false)

  const [isJoinDisabled, setIsJoinDisabled] = useState(true)

  const [sessionID, setSessionID] = useState('')
  const [token, setToken] = useState('')

  const [socket, setSocket] = useState('')

  const [patientList, setPatientList] = useState('')

  useEffect(() => {
    setOpen(true)

    const socket = socketIOClient(ENDPOINT, {
      transports: ['websocket'],
      jsonp: false,
      query: {
        token: localStorage.getItem('virujhToken'),
      },
    })

    socket.on('connect', function () {
      if (localStorage.getItem('loginUser') === 'doctor') {
        socket.emit('createTokenForDoctor')
      } else {
        socket.emit('getPatientTokenForDoctor', location.state)
      }

      socket.emit('getAppointmentListForDoctor')

      socket.on('getDoctorAppointments', (data) => {
        console.log(data)
        setPatientList(data)
      })
      socket.on('videoTokenForDoctor', (data) => {
        setIsJoinDisabled(false)
        setSessionID(data.sessionId)
        setToken(data.token)
      })

      socket.on('videoTokenForPatient', (data) => {
        setIsJoinDisabled(false)
        setSessionID(data.sessionId)
        setToken(data.token)
      })
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <Fragment>
      <ConfirmationModal
        open={open}
        handleOnOpen={setOpen}
        isJoinDisabled={isJoinDisabled}
      />

      {!isJoinDisabled && token && !open && (
        <Video
          token={token}
          socket={socket}
          sessionID={sessionID}
          patientList={patientList}
        />
      )}
    </Fragment>
  )
}

export default VideoConsulation
