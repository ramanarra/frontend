import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Dialog,
  DialogContent,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicNoneIcon from '@material-ui/icons/MicNone'
import MicOffIcon from '@material-ui/icons/MicOff'
import IconButton from '@material-ui/core/IconButton'
import PersonIcon from '@material-ui/icons/Person'
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare'

import Select from '../../components/Select'

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
  box: {
    width: 450,
    height: 400,
    border: '1px solid #a8a8a8',
  },
  button: {
    textAlign: 'center',
    paddingTop: 10,
  },
  joinButton: {
    paddingLeft: 360,
    paddingRight: 360,
    backgroundColor: '#3952ec',
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
    width: 450,
    height: 400,
    paddingLeft: 15,
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
      width: 400,
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
      width: 400,
      '& div': {
          paddingTop: 14,
      },
    },
  },
  screen: {
    width: 400,
  },
}))

const microPhoneOption = [
  { value: 'none', label: 'None' },
  {
    value: 'Default - Microphone (HD Webcam C310) (046d:081b)',
    label: 'Default - Microphone (HD Webcam C310) (046d:081b)',
  },
  {
    value: 'Communications - Microphone (HD Webcam C310) (046d:081b)',
    label: 'Communications - Microphone (HD Webcam C310) (046d:081b)',
  },
  { value: 'Microphone (Realtek(R) Audio)', label: 'Microphone (Realtek(R) Audio)' },
]

const videoOptions = [
  { value: 'none', label: 'None' },
  {
    value: 'Logitech HD Webcam C310 (046d:081b)',
    label: 'Logitech HD Webcam C310 (046d:081b)',
  },
]

function ConfirmationPopUp({ open, handleOnOpen, isJoinDisabled }) {
  const classes = useStyle()

  const history = useHistory()

  function handleClose() {
    handleOnOpen(false)
  }

  function handleOnClick() {
    handleOnOpen(false)
  }

  return (
    <Box>
      <Dialog open={open} className={classes.dialog}>
        <DialogContent className={classes.content}>
          <Box className={classes.icon}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Box display="flex">
            <Box className={classes.box}></Box>
            <Box className={classes.right}>
                <Box className={classes.header}>
                    <Typography className={classes.text}>AVATAR</Typography>
                </Box>
              <Box display="flex" className={classes.nickName}>
                <IconButton className={classes.personbutton}> 
                  <PersonIcon />
                </IconButton>
                <TextField className={classes.name} label="Nick name" />
              </Box>
              <Box display="flex" className={classes.nickName}>
                <IconButton className={classes.microPhoneButton}>
                  <MicNoneIcon />
                </IconButton>
                <Box className={classes.microPhone}>
                  <Select options={microPhoneOption} />
                </Box>
              </Box>
              <Box display="flex" className={classes.nickName}>
                <IconButton className={classes.videoButton}>
                  <VideocamIcon />
                </IconButton>
                <Box className={classes.video}>
                  <Select options={videoOptions} />
                </Box>
              </Box>
              <Box display="flex" className={classes.nickName}>
                <IconButton className={classes.shareButton}>
                  <StopScreenShareIcon />
                </IconButton>
                <TextField className={classes.screen} value="None" label="Screen" disabled />
              </Box>
            </Box>
          </Box>
          <Box className={classes.button}>
            <Button
              className={classes.joinButton}
              onClick={handleOnClick}
              disabled={isJoinDisabled}
              style={{ backgroundColor: '#3952ec' }}
            >
              JOIN
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ConfirmationPopUp
