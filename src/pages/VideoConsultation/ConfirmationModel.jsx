import React, { useState } from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import Webcam from 'react-webcam'
import {
  Box,
  Dialog,
  DialogContent,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import Wait from '../../assets/img/wait.svg'
import Join from '../../assets/img/join.svg'
import CameraOff from '../../assets/img/camera-off.svg'
import getTimeFormatWithNoon from '../../lib/dateLib'
import MicOnIcon from '../../assets/img/mic-on.svg'
import MicOffIcon from '../../assets/img/mic-off.svg'
import VideoOnIcon from '../../assets/img/video-on.svg'
import VideoOffIcon from '../../assets/img/video-off.svg'

const useStyle = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 1000,
    },
  },
  content: {
    width: 980,
    height: 520,
  },
  icon: {
    textAlign: 'end',
  },
  closeIcon: {
    cursor: 'pointer',
    color: '#e81a40',
  },
  videoBox: {
    width: 450,
    height: 400,
    border: '1px solid #a8a8a8',
  },
  button: {
    textAlign: 'center',
    paddingTop: 10,
  },
  joinButton: {
    paddingLeft: 150,
    paddingRight: 150,
    borderRadius: 5,
    color: '#ffffff',
  },
  errorMsg: {
    color: '#ea2121',
    paddingTop: 5,
  },
  message: {
    color: '#ea2121',
    fontSize: 17,
    paddingTop: 12,
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#d8d6d6',
    height: 30,
  },
  text: {
    paddingTop: 5,
  },
  right: {
    width: 425,
    paddingLeft: 75,
  },
  waiting: {
    width: 380,
    height: 280,
  },
  join: {
    width: 380,
    height: 280,
  },
  nickName: {
    paddingTop: 20,
  },
  personbutton: {
    marginTop: 16,
    padding: 7,
    backgroundColor: '#e3dede',
    marginRight: 20,
  },
  name: {
    width: 400,
  },
  microPhone: {
    width: 400,
    '& div': {
      width: 380,
      '& div': {
        paddingTop: 14,
      },
    },
  },
  microPhoneButton: {
    padding: 7,
    marginRight: 20,
    backgroundColor: '#e3dede',
  },
  videoButton: {
    padding: 7,
    marginRight: 20,
    backgroundColor: '#e3dede',
  },
  shareButton: {
    color: '#dd1515',
    padding: 7,
    marginRight: 20,
    backgroundColor: '#e3dede',
  },
  video: {
    width: 400,
    '& div': {
      width: 380,
      '& div': {
        paddingTop: 14,
      },
    },
  },
  screen: {
    width: 400,
  },
  selecedTab: {
    backgroundColor: '#000000',
  },
  error: {
    color: '#ffffff',
    fontSize: 20,
  },
  errorBox: {
    marginTop: -240,
    textAlign: 'center',
  },
  cameraOff: {
    width: 35,
  },
  fieldName: {
    fontSize: 15,
    paddingRight: 5,
    color: '#16d9be',
  },
  value: {
    fontSize: 14,
    paddingTop: 2,
  },
  box: {
    justifyContent: 'center',
  },
  videoIcon: {
    width: 27,
    height: 27,
  },
  icons: {
    justifyContent: 'center',
  },
  iconButton: {
    marginLeft: 30,
    background: '#ffffff',
    width: 60,
    height: 60,
    '&:hover': {
      background: '#ffffff',
    },
  },
  videoOff: {
    background: '#000000',
  },
}))

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
  s,
}) {
  const classes = useStyle()

  const history = useHistory()

  const [videoAvailable, setVideoAvailable] = useState(true)

  const doctorName = appointmentDetail?.doctorLastName
    ? `${appointmentDetail?.doctorFirstName}${' '}${
        appointmentDetail?.doctorLastName
      }`
    : `${appointmentDetail?.doctorFirstName}`

  const date = moment(appointmentDetail?.appointmentDate).format('DD MMMM YYYY')

  const startTime = getTimeFormatWithNoon(appointmentDetail?.startTime)

  const endTime = getTimeFormatWithNoon(appointmentDetail?.endTime)

  function handleClose() {
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

  navigator.getUserMedia(
    { audio: true },
    function () {},
    function () {
      audioAvailability(false)
    }
  )

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
                {
                  videoAvailable && isVideoStatus &&
                  <Webcam
                  audio={false}
                  width="212"
                  height="160"
                  onUserMediaError={() => handleOnVideo()}
                />
                }
                {!videoAvailable && (
                  <Box className={classes.errorBox}>
                    <img src={CameraOff} className={classes.cameraOff} />
                    <Typography className={classes.error}>
                      Camera not found
                    </Typography>
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
                <Box>
                  <Box display="flex">
                    <Typography className={classes.fieldName}>
                      Doctor Name:
                    </Typography>
                    <Typography
                      className={classes.value}
                      variant="h5"
                    >{`${'Dr. '}${doctorName}`}</Typography>
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
                    >{`${startTime}${'-'}${endTime}`}</Typography>
                  </Box>
                </Box>
              )}
              <Box className={classes.button}>
                <Button
                  className={classes.joinButton}
                  onClick={handleOnClick}
                  disabled={isJoinDisabled}
                  style={{ backgroundColor: '#0bb5ff' }}
                >
                  JOIN
                </Button>
                {isJoinDisabled
                  ? localStorage.getItem('loginUser') === 'patient' && (
                      <Typography className={classes.errorMsg}>
                        {liveStatus
                          ? `${'Dr. '}${doctorName}${' is '}${liveStatus}`
                          : `${'Waiting for '}${'Dr. '}${doctorName}${' to come online'}`}
                      </Typography>
                    )
                  : localStorage.getItem('loginUser') === 'patient' && (
                      <Typography className={classes.message}>
                        Take Online {'Dr. '}
                        {doctorName} Consultation
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
