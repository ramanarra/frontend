import React, { useState, useEffect, Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

import ConfirmationModal from './ConfirmationModel'
import Video from './Video'
import SnackBar from '../../components/SnackBar'

const ENDPOINT = 'https://dev.virujh.com'

function VideoConsulation() {
  const [open, setOpen] = useState(false)

  const [isJoinDisabled, setIsJoinDisabled] = useState(true)

  const [videoAvailability, setVideoAvailability] = useState(true)

  const [audioAvailability, setAudioAvailability] = useState(true)

  const [sessionID, setSessionID] = useState('')

  const [token, setToken] = useState('')

  const [socket, setSocket] = useState('')

  const [patientList, setPatientList] = useState('')

  const [openDialog, setOpenDialog] = useState(false)

  const [data, setData] = useState(null)

  const location = useLocation()

  const history = useHistory()

  useEffect(() => {
    setOpen(true)

    const socket = socketIOClient(ENDPOINT,  {
      transports: ['websocket'],
      jsonp: false,
      query: {
        token: localStorage.getItem('virujhToken'),
      },
      path: '/socket.io'
    })

    socket.on('connect', function () {
      if (localStorage.getItem('loginUser') === 'doctor') {
        socket.emit('createTokenForDoctor')
      } else {
        socket.emit('getPatientTokenForDoctor', location.state)
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
        else {
          setData(data)
          setOpenDialog(true)
        }
      })

      socket.on('videoTokenForPatient', (data) => {
        if (data.isToken) {
          setIsJoinDisabled(false)
          setSessionID(data.sessionId)
          setToken(data.token)
        }
      })
    })

    socket.on('videoTokenRemoved', (data) => {
      if (data.isRemoved) {
        if(localStorage.getItem('loginUser') === 'patient') {
        history.push('/patient/appointments/upcoming')
        }
      }
    })

    socket.on('videoSessionRemoved', (data) => {
      if(data.isRemoved) {
        if(localStorage.getItem('loginUser') === 'patient') {
          history.push('/patient/appointments/upcoming')
        }
      }
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  function handleOnClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpenDialog(false)
    setData(null)
    history.push('/doctors')
  }

  return (
    <Fragment>
      <ConfirmationModal
        open={open}
        handleOnOpen={setOpen}
        isJoinDisabled={isJoinDisabled}
        videoAvailability={setVideoAvailability}
        audioAvailability={setAudioAvailability}
      />

      {!isJoinDisabled && token && !open && (
        <Video
          token={token}
          socket={socket}
          sessionID={sessionID}
          patientList={patientList}
          videoAvailability={videoAvailability}
          audioAvailability={audioAvailability}
        />
      )}
      {
        openDialog && data &&
        <SnackBar
        openDialog={openDialog}
        message={data.message}
        onclose={handleOnClose}
        severity={'error'}
        />
      }
    </Fragment>
  )
}

export default VideoConsulation
