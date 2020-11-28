import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'

import OpenViduReact from '../../OpenViduCore/components/VideoRoomComponent'
import ToolBarComponent from './Toolbar'
import SideBar from './SideBar'
import { setOpenSideBar } from '../../actions/doctor'

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
  isVideoStatus,
  setPatientAppointmentId,
  setOpenSideBar,
}) {

  const [end, setEnd] = useState(false)

  const [open, setOpen] = useState(false)

  const [byDoctor, setByDoctor] = useState(false)

  const [appointmenttId, setAppointmentId] = useState(null)

  const [isPatientClick, setIsPatientClick] = useState(false)

  const [fullScreen, setFullScreen] = useState(false)

  const [interChange, setInterChange] = useState(false)

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
      setOpenSideBar(true)
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

  function handleOnFullScreen() {
    if(fullScreen) {
      setInterChange(false)
    }
    setFullScreen(!fullScreen)
  }

  function handleOnInterChange() {
    setInterChange(!interChange)
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
            isVideoStatus={isVideoStatus}
            handleOnFullScreen={handleOnFullScreen}
            isFullScreen={fullScreen}
            isInterChange={interChange}
            handleOnInterChange={handleOnInterChange}
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
            setPatientAppointmentId={setPatientAppointmentId}
            setFullScreen={setFullScreen}
            setInterChange={setInterChange}
          />
        </Box>
      )}
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenSideBar: (data) => dispatch(setOpenSideBar(data)),
  }
}

export default connect(null, mapDispatchToProps)(VideoConsultotion)
