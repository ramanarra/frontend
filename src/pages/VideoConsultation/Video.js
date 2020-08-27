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
  videoAvailability,
  audioAvailability,
}) {
  const [end, setEnd] = useState(false)

  const [open, setOpen] = useState(false)

  const [appointmenttId, setAppointmentId] = useState(null)

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

  function leaveCall() {
    if (localStorage.getItem('loginUser') === 'doctor') {
      if(appointmenttId) {
        socket.emit('removeSessionAndTokenByDoctor', appointmenttId)
      }
      history.push('/doctors')
    } else {
      history.push('/patient/appointments/upcoming')
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
          />
        </Box>
      )}
    </Fragment>
  )
}

export default VideoConsultotion
