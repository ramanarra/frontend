import React, { useState, Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'

import OpenViduReact from '../../OpenViduCore/components/VideoRoomComponent'
import ToolBarComponent from './Toolbar'
import SideBar from './SideBar'

function VideoConsultotion({
  token,
  sessionID,
  patientList,
  socket,
  timer,
  videoAvailability,
  audioAvailability,
  appointmentId,
  waitingPatient,
  isWaiting,
  waitingIndex,
  isAudioStatus,
}) {

  const [end, setEnd] = useState(false)

  const [open, setOpen] = useState(false)

  const [byDoctor, setByDoctor] = useState(false)

  const [appointmenttId, setAppointmentId] = useState(null)

  const [isPatientClick, setIsPatientClick] = useState(false)

  const history = useHistory()

  const location = useLocation()

  const doctorName =
    localStorage.getItem('loginUser') === 'doctor'
      ? localStorage.getItem('doctorName')
      : location.doctorName

  const [patientName, setPatientName] = useState('')

  function onPatientJoining(appointmenttId, patientName) {
    socket.emit('createTokenForPatientByDoctor', appointmenttId)
    setPatientName(patientName)
  }

  function leaveCall(status) {
    if (localStorage.getItem('loginUser') === 'doctor') {
      if (appointmenttId) {
        socket.emit('removePatientTokenByDoctor', {
          appointmentId: appointmenttId,
          status: status,
        })
        socket.emit('removeSessionAndTokenByDoctor')
      }
      socket.emit('updateLiveStatusOfUser', { status: 'online' })
      history.push('/doctors')
      socket.disconnect()
      clearInterval(timer)
    } else {
      history.push({
        pathname: '/patient/appointments/upcoming',
        state: appointmentId,
      })
      socket.disconnect()
    }
  }

  function endCall() {
    setEnd(!end)
  }

  function AddNextPatient() {
    setOpen(true)
  }

  function onClose() {
    setOpen(false)
    setByDoctor(false)
  }

  function clickByDoctor() {
    setByDoctor(true)
  }

  return (
    <Fragment>
      {token && (
        <Box>
          <OpenViduReact
            ToolBarComponent={ToolBarComponent}
            onPatientJoining={onPatientJoining}
            sessionName={sessionID}
            token={token}
            patientList={patientList}
            doctorName={doctorName}
            patientName={
              localStorage.getItem('loginUser') === 'doctor'
                ? patientName
                : localStorage.getItem('patientName')
            }
            leaveCall={leaveCall}
            endCall={endCall}
            AddNextPatient={AddNextPatient}
            videoAvailability={videoAvailability}
            audioAvailability={audioAvailability}
            isPatientClick={isPatientClick}
            isAudioStatus={isAudioStatus}
          />
          <SideBar
            patientList={patientList}
            onPatientJoining={onPatientJoining}
            endCall={endCall}
            end={end}
            socket={socket}
            openDialog={open}
            onClose={onClose}
            setAppointmentId={setAppointmentId}
            AddNextPatient={AddNextPatient}
            byDoctor={byDoctor}
            clickByDoctor={clickByDoctor}
            setIsPatientClick={setIsPatientClick}
            waitingPatient={waitingPatient}
            isWaiting={isWaiting}
            waitingIndex={waitingIndex}
          />
        </Box>
      )}
    </Fragment>
  )
}

export default VideoConsultotion
