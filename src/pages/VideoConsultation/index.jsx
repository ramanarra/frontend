import React, { useState, useEffect, Fragment, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import LeaveCallModal from './LeaveCallModal'
import ConfirmationModal from './ConfirmationModel'
import Video from './Video'
import SnackBar from '../../components/SnackBar'
import { baseURL } from '../../baseURL'
import { connect } from 'react-redux'
import { setMessages } from '../../actions/doctor'
import{setvideoStatus} from '../../actions/patient'
import useFetch from '../../hooks/useFetch'
import { URL } from '../../api'
import useStyle from './useConfirmationModalStyle'
import { Box ,DialogContent,Typography,DialogTitle,Dialog} from '@material-ui/core'

const ENDPOINT = baseURL

function VideoConsulation({ sendMessage, setVideoStatus }) {
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
  const [prescription, setPrescription] = useState(null)
  // const[videoStatus, setVideoStatus]=useState()
  const classes = useStyle()
  const location = useLocation()
  const history = useHistory()
  const isPaused = useMemo(() => location.state?.isPaused, [
    location.state?.isPaused,
  ])

  const appointmentId = useMemo(() => location.state, [location.state])
  const currentAppointmentId = location.state?.appointmentId

  const id = currentAppointmentId ? currentAppointmentId : appointmentId
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
        socket.emit('getPatientTokenForDoctor', location.state?.appointmentId)
        socket.emit('updateLiveStatusOfUser', { status: 'online' })
      }

      if (localStorage.getItem('loginUser') === 'doctor') {
        // const timer = setInterval(
        //   () => 
        socket.emit('getAppointmentListForDoctor')
        // ,
        //   10000
        // )
        // setTimer(timer)
      }

      socket.on('getDoctorAppointments', (data) => {
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
      
       if (data.Videostatus=='completed') {
        
        const newValue=data.Videostatus;
        setVideoStatus(newValue)
        if (localStorage.getItem('loginUser') === 'patient') {
          history.push({
                pathname: 'patient/appointments/upcoming',
                newState: newValue,
             })
          socket.emit('updateLiveStatusOfUser', { status: 'online' })
          // }
        }
      }
    })

    socket.on('videoSessionRemoved', (data) => {
      if (data.isRemoved) {
        if (localStorage.getItem('loginUser') === 'patient' && !isPaused) {
          history.push('/patient/appointments/upcoming')
          socket.emit('updateLiveStatusOfUser', { status: 'online' })
        }
      }
    })

    // socket.on('emitPauseStatus', (res) => {
    //   if (res.status === 'CALL_PAUSED_BY_DOCTOR') {
    //     // handleOnOpen(res.appoinmentId, true)
    //   }
    // })

    socket.on('getPrescriptionDetails', (res) => {
      setPrescription(res)
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
    if (location.isWaiting && patientList) {
      patientList.map((patient, index) => {
        if (patient.appointmentId === location.state.appointmentId) {
          setIndex(index)
          setOpen(false)
        }
      })
    }
  }, [patientList])

  useEffect(() => {
    if (!!prescription) {
      sendMessage(
        {
          message: `Prescription`,
          from: localStorage.getItem('loginUser') === 'patient' ? 'sender' : 'user',
          type: 'spl_prescription',
          data: {
            prescription: prescription?.prescription,
            remarks: prescription?.prescriptionRemarks
          },

        },
        prescription?.appointmentId
      )
    }
  }, [prescription])
//  here the report is sended for both doctor and patient
  const { appointmentReport, fetchAppointmentReport } = useFetch({
    name: 'appointmentReport',
    url: URL.appointmentReport,
    initLoad: false
  })
//to get appointmentId for report
  useEffect(() => {
    if(!!appointmentId) {
      fetchAppointmentReport({
        params: {
          appointmentId
        }
      })
    }
  }, [appointmentId])


  useEffect(() => {
    //to send reports to chat

    if (!!appointmentReport && !!appointmentReport?.reports?.length ) {
      sendMessage({
        message: `Appointment report`,
        from: localStorage.getItem('loginUser') === 'patient' ? 'user' : 'sender',
        type: 'spl_appointment_report',
        data: appointmentReport?.reports,
      }, appointmentReport?.appoinmentId)
     }

  }, [appointmentReport])

  return (
    <Fragment>
      {(!location.isWaiting) && (
        <ConfirmationModal
          open={open}
          handleOnOpen={setOpen}
          isJoinDisabled={isJoinDisabled}
          videoAvailability={setVideoAvailability}
          audioAvailability={setAudioAvailability}
          socket={socket}
          liveStatus={location.liveStatus}
          appointmentId={location.state?.appointmentId}
          appointmentDetail={location.appointmentDetail}
          isAudioStatus={isAudioStatus}
          setIsAudioStatus={setIsAudioStatus}
          isVideoStatus={isVideoStatus}
          setIsVideoStatus={setIsVideoStatus}
          patientAppointmentId={id}
          list={location.list}
          isPaused={isPaused}
        />
      )}

      {!isJoinDisabled && token && !open && !isPaused && (
        <Video
          token={token}
          socket={socket}
          timer={timer}
          sessionID={sessionID}
          patientList={patientList}
          videoAvailability={videoAvailability}
          audioAvailability={audioAvailability}
          appointmentId={location.state?.appointmentId}
          waitingPatient={location.state?.appointmentId}
          isWaiting={location.isWaiting}
          waitingIndex={index}
          isAudioStatus={isAudioStatus}
          isVideoStatus={isVideoStatus}
          setPatientAppointmentId={setPatientAppointmentId}
          prescription={prescription}
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

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (data, appointmentId) => dispatch(setMessages(data, appointmentId)),
    setVideoStatus: (newValue) => dispatch(setvideoStatus(newValue)),
  }
}

export default connect(null, mapDispatchToProps)(VideoConsulation)
