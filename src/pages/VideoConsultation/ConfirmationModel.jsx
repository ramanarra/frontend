import React, { useState } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import Webcam from 'react-webcam'
import { Box, Dialog, DialogContent, Button, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { VideocamOff, MicOff } from '@material-ui/icons'

import Wait from '../../assets/img/wait.svg'
import Join from '../../assets/img/join.svg'
import CameraOff from '../../assets/img/camera-off.svg'
import getTimeFormatWithNoon from '../../lib/dateLib'
import MicOnIcon from '../../assets/img/mic-on.svg'
import MicOffIcon from '../../assets/img/mic-off.svg'
import VideoOnIcon from '../../assets/img/video-on.svg'
import VideoOffIcon from '../../assets/img/video-off.svg'
import useStyle from './useConfirmationModalStyle'
import NoCam from '../../OpenViduCore/components/stream/NoCam'

function ConfirmationPopUp({
  open,
  handleOnOpen,
  isJoinDisabled,
  videoAvailability,
  audioAvailability,
  socket,
  liveStatus,
  appointmentId,
  appointmentDetail,
  isAudioStatus,
  setIsAudioStatus,
  isVideoStatus,
  setIsVideoStatus,
  patientAppointmentId,
  list,
  isPaused,
}) {
  const classes = useStyle()

  const history = useHistory()

  const [videoAvailable, setVideoAvailable] = useState(true)

  const detail =
    list &&
    list.filter((appointment) => appointment.appointmentId === patientAppointmentId)

  const doctorName = detail
    ? detail[0]?.doctorLastName
      ? `${detail[0]?.doctorFirstName}${' '}${detail[0]?.doctorLastName}`
      : `${detail[0]?.doctorFirstName}`
    : null
  // :
  // appointmentDetail?.doctorLastName
  // ? `${appointmentDetail?.doctorFirstName}${' '}${
  //     appointmentDetail?.doctorLastName
  //   }`
  // : `${appointmentDetail?.doctorFirstName}`

  const userName =
    localStorage.getItem('loginUser') === 'doctor'
      ? localStorage.getItem('doctorName')
      : localStorage.getItem('patientName')

  const date = detail
    ? moment(detail[0]?.appointmentDate).format('DD MMMM YYYY')
    : null

  const startTime = detail ? getTimeFormatWithNoon(detail[0]?.startTime) : null

  const endTime = detail ? getTimeFormatWithNoon(detail[0]?.endTime) : null

  function handleClose() {
    socket.disconnect()
    handleOnOpen(false)
    if (localStorage.getItem('loginUser') === 'doctor') {
      history.push('/doctors')
    } else {
      history.push({
        pathname: '/patient/appointments/upcoming',
        state: appointmentId,
      })
    }
  }

  function handleOnClick() {
    handleOnOpen(false)
    socket.emit('updateLiveStatusOfUser', { status: 'inSession' })
  }

  function handleOnVideo() {
    setVideoAvailable(false)
    videoAvailability(false)
  }

  function onMuteStateChange() {
    setIsAudioStatus(!isAudioStatus)
  }

  function onVideoStateChange() {
    setIsVideoStatus(!isVideoStatus)
  }

  return (
    <Box>
      <Dialog open={open} className={classes.dialog}>
        <DialogContent className={classes.content}>
          <Box className={classes.icon}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Box display="flex">
            <Box>
              <Box
                className={classNames(classes.videoBox, {
                  [classes.selecedTab]: !videoAvailable,
                  [classes.videoOff]: videoAvailable && !isVideoStatus,
                })}
              >
                {videoAvailable && isVideoStatus ? (
                  <Webcam
                    audio={true}
                    width="212"
                    height="160"
                    onUserMediaError={() => handleOnVideo()}
                  />
                ) : (
                  <Box>
                    <NoCam name={userName} />
                  </Box>
                )}
                {(!isVideoStatus || !isAudioStatus) && (
                  <Box className={classes.statusWrap}>
                    {!isVideoStatus && (
                      <Box className={classes.statusIconWrap}>
                        <VideocamOff />
                      </Box>
                    )}
                    {!isAudioStatus && (
                      <Box className={classes.statusIconWrap}>
                        <MicOff />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
              <Box display="flex" className={classes.icons}>
                <IconButton
                  className={classes.iconButton}
                  onClick={onMuteStateChange}
                >
                  {isAudioStatus ? (
                    <img src={MicOnIcon} className={classes.videoIcon} />
                  ) : (
                    <img src={MicOffIcon} className={classes.videoIcon} />
                  )}
                </IconButton>
                <IconButton
                  className={classes.iconButton}
                  onClick={onVideoStateChange}
                >
                  {isVideoStatus ? (
                    <img src={VideoOnIcon} className={classes.videoIcon} />
                  ) : (
                    <img src={VideoOffIcon} className={classes.videoIcon} />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box className={classes.right}>
              {isJoinDisabled ? (
                <img
                  src={Wait}
                  className={classNames(classes.doctorWaiting, {
                    [classes.waiting]:
                      localStorage.getItem('loginUser') === 'patient',
                  })}
                />
              ) : (
                <Box>
                  <img
                    src={Join}
                    className={classNames(classes.doctorJoin, {
                      [classes.join]:
                        localStorage.getItem('loginUser') === 'patient',
                    })}
                  />
                </Box>
              )}
              {localStorage.getItem('loginUser') === 'patient' && (
                <Box className={classes.details}>
                  <Box display="flex">
                    <Typography className={classes.fieldName}>
                      Doctor Name:
                    </Typography>
                    <Typography
                      className={classes.value}
                      variant="h5"
                    >{`${doctorName ? ('Dr. ' + doctorName) : ''}`}</Typography>
                  </Box>
                  <Box display="flex">
                    <Typography className={classes.fieldName}>Date:</Typography>
                    <Typography className={classes.value} variant="h5">
                      {date}
                    </Typography>
                  </Box>
                  <Box display="flex" className={classes.time}>
                    <Typography className={classes.fieldName}>Time:</Typography>
                    <Typography
                      className={classes.value}
                      variant="h5"
                    >{`${startTime ? (startTime + '-') : ''}${endTime ? endTime : ''}`}</Typography>
                  </Box>
                </Box>
              )}
              <Box className={classes.button}>
                <Button
                  className={classes.joinButton}
                  onClick={handleOnClick}
                  disabled={isJoinDisabled}
                  style={
                    isJoinDisabled
                      ? { backgroundColor: '#edeff2' }
                      : { backgroundColor: '#00b5ff' }
                  }
                >
                  JOIN
                </Button>
                {isJoinDisabled
                  ? localStorage.getItem('loginUser') === 'patient' && (
                      <Typography className={classes.errorMsg}>
                        {liveStatus
                          ? `${'Requested Doctor to Join Please wait...'}`
                          : `${'Waiting for Dr. '}${doctorName && doctorName!= 'undefined' ? doctorName : ''}${' to come online'}`}
                      </Typography>
                    )
                  : localStorage.getItem('loginUser') === 'patient' && (
                      <Typography className={classes.message}>
                        {isPaused
                          ? 'Dr. ${doctorName} has placed you on hold'
                          : `Please Join On Consultation Call ${doctorName && doctorName!= 'undefined' ? ('With Dr.'+ doctorName) : doctorName} `}
                      </Typography>
                    )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ConfirmationPopUp
