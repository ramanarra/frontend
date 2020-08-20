import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'

import OpenViduReact from '../../OpenViduCore/components/VideoRoomComponent'
import ToolBarComponent from './Toolbar'
import SideBar from './SideBar'

const ENDPOINT = 'http://dev-api.virujh.com:8081/'

function VideoConsultotion({ location, token, sessionID, patientList, socket }) {

  const [end, setEnd] = useState(false)

  const history = useHistory()

  const doctorName =
    localStorage.getItem('loginUser') === 'doctor'
      ? localStorage.getItem('doctorName')
      : 'udhaya'

  const [patientName, setPatientName] = useState('')

  function onPatientJoining(appointmenttId, patientName) {
    socket.emit('createTokenForPatientByDoctor', appointmenttId)
    setPatientName(patientName)
  }

  function leaveCall() {
    if (localStorage.getItem('loginUser') === 'doctor') {
      socket.emit('removeSessionAndTokenByDoctor')
      history.push('/doctors')
    } else {
      history.push('/patient/appointments/upcoming')
    }
  }

  function endCall() {
    setEnd(!end)
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
            patientName={patientName}
            leaveCall={leaveCall}
            endCall={endCall}
          />
          <SideBar
            patientList={patientList}
            onPatientJoining={onPatientJoining}
            endCall={endCall}
            end={end}
          />
        </Box>
      )}
    </Fragment>
  )
}

export default VideoConsultotion
