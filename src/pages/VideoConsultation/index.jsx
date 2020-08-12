import React, { useEffect, useState, Fragment } from 'react'
import socketIOClient from 'socket.io-client'

import OpenViduReact from '../../OpenViduCore/components/VideoRoomComponent'
import ToolBarComponent from './Toolbar'

const ENDPOINT = 'http://dev-api.virujh.com:8081/'

function VideoConsultotion() {
  const [sessionID, setSessionID] = useState('')
  const [token, setToken] = useState('')

  const [socket, setSocket] = useState('')
  useEffect(() => {
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
        socket.emit('getPatientTokenForDoctor', 318)
      }

      socket.emit('getAppointmentListForDoctor')

      socket.on('getDoctorAppointments', (data) => {
        console.log(data)
      })
      socket.on('videoTokenForDoctor', (data) => {
        console.log('called')
        setSessionID(data.sessionId)
        setToken(data.token)
      })

      socket.on('videoTokenForPatient', (data) => {
        console.log('called')

        console.log(data.token)
        setSessionID(data.sessionId) 
        setToken(data.token)
      })
    })

    setSocket(socket)
  }, [])


  function onPatientJoining() {
    socket.emit('createTokenForPatientByDoctor', 323)
  }

  return (
    <Fragment>
      {token && <OpenViduReact ToolBarComponent={ToolBarComponent}  onPatientJoining={onPatientJoining} sessionName={sessionID} token={token} />}
    </Fragment>
  )
}

export default VideoConsultotion
