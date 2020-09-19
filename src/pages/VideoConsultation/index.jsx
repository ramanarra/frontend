import React, { useState, useEffect, Fragment } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

import ConfirmationModal from './ConfirmationModel'
import Video from './Video'
import SnackBar from '../../components/SnackBar'
import { baseURL } from '../../baseURL'

const ENDPOINT = baseURL

function VideoConsulation() {
  const [open, setOpen] = useState(false)

  const [isJoinDisabled, setIsJoinDisabled] = useState(true)

  const [videoAvailability, setVideoAvailability] = useState(true)

  const [audioAvailability, setAudioAvailability] = useState(true)

  const [sessionID, setSessionID] = useState('')

  const [token, setToken] = useState('')

  const [socket, setSocket] = useState('')

  const [timer, setTimer] = useState(null)

  const [index, setIndex] = useState(null)

  const [patientList, setPatientList] = useState('')

  const [openDialog, setOpenDialog] = useState(false)

  const [data, setData] = useState(null)

  const [isAudioStatus, setIsAudioStatus] = useState(true)

  const [isVideoStatus, setIsVideoStatus] = useState(true)

  const [patientAppointmentId, setPatientAppointmentId] = useState(null)

  const location = useLocation()

  const history = useHistory()

  useEffect(() => {
    setOpen(true)

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
      } else {
        socket.emit('getPatientTokenForDoctor', location.state)
        socket.emit('updateLiveStatusOfUser', { status: 'online' })
      }

      if(localStorage.getItem('loginUser') === 'doctor') {
        const timer = setInterval(() => socket.emit('getAppointmentListForDoctor'), 10000)
        setTimer(timer)
      }

      socket.on('getDoctorAppointments', (data) => {
        // console.log('2',data)
        setPatientList(data)
      })
      socket.on('videoTokenForDoctor', (data) => {
        if (data.isToken) {
          setIsJoinDisabled(false)
          setSessionID(data.sessionId)
          setToken(data.token)
        } else {
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
        if (localStorage.getItem('loginUser') === 'patient') {
          history.push('/patient/appointments/upcoming')
          socket.emit('updateLiveStatusOfUser', { status: 'online' })
        }
      }
    })

    socket.on('videoSessionRemoved', (data) => {
      if (data.isRemoved) {
        if (localStorage.getItem('loginUser') === 'patient') {
          history.push('/patient/appointments/upcoming')
          socket.emit('updateLiveStatusOfUser', { status: 'online' })
        }
      }
    })

    setSocket(socket)
  }, [])

  function handleOnClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpenDialog(false)
    setData(null)
    history.push('/doctors')
  }

  useEffect(() => {
    if(location.isWaiting && patientList) {
      patientList.map((patient, index) => {
        if(patient.appointmentId === location.state.appointmentId) {
          setIndex(index)
          setOpen(false)
        }
      })
    }
  }, [patientList])


  return (
    <Fragment>
      {!location.isWaiting && (
        <ConfirmationModal
          open={open}
          handleOnOpen={setOpen}
          isJoinDisabled={isJoinDisabled}
          videoAvailability={setVideoAvailability}
          audioAvailability={setAudioAvailability}
          socket={socket}
          liveStatus={location.liveStatus}
          appointmentId={location.state}
          appointmentDetail={location.appointmentDetail}
          isAudioStatus={isAudioStatus}
          setIsAudioStatus={setIsAudioStatus}
          isVideoStatus={isVideoStatus}
          setIsVideoStatus={setIsVideoStatus}
          patientAppointmentId={patientAppointmentId}
        />
      )}

      {!isJoinDisabled && token && !open && (
        <Video
          token={token}
          socket={socket}
          timer={timer}
          sessionID={sessionID}
          patientList={patientList}
          videoAvailability={videoAvailability}
          audioAvailability={audioAvailability}
          appointmentId={location.state}
          waitingPatient={location.state}
          isWaiting={location.isWaiting}
          waitingIndex={index}
          isAudioStatus={isAudioStatus}
          isVideoStatus={isVideoStatus}
          setPatientAppointmentId={setPatientAppointmentId}
        />
      )}
      {openDialog && data && (
        <SnackBar
          openDialog={openDialog}
          message={data.message}
          onclose={handleOnClose}
          severity={'error'}
        />
      )}
    </Fragment>
  )
}

export default VideoConsulation
