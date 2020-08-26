import React from 'react'
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

import Wait from '../../assets/img/wait.svg'
import Join from '../../assets/img/join.svg'

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
    paddingLeft: 150,
    paddingRight: 150,
    borderRadius: 5,
  },
  errorMsg: {
    color: '#ea2121',
    paddingTop: 5,
  },
  message: {
    color: '#ea2121',
    position: 'absolute',
    fontSize: 17,
    bottom: 150,
    right: 145,
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
}))

function ConfirmationPopUp({ open, handleOnOpen, isJoinDisabled }) {
  const classes = useStyle()

  const history = useHistory()

  function handleClose() {
    handleOnOpen(false)
    if (localStorage.getItem('loginUser') === 'doctor') {
      history.push('/doctors')
    } else {
      history.push('/patient/appointments/upcoming')
    }
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
            <Box className={classes.box}>
              <Webcam audio={false} width="212" height="160" />
            </Box>
            <Box className={classes.right}>
              {isJoinDisabled ? (
                <img src={Wait} className={classes.waiting} />
              ) : (
                <Box>
                  <img src={Join} className={classes.join} />
                  <Typography className={classes.message}>Take Online Doctor Consultaion</Typography>
                </Box>
              )}
              <Box className={classes.button}>
                <Button
                  className={classes.joinButton}
                  onClick={handleOnClick}
                  disabled={isJoinDisabled}
                  style={{ backgroundColor: '#0ee5ff' }}
                >
                  JOIN
                </Button>
                {isJoinDisabled && (
                  <Typography className={classes.errorMsg}>
                    Doctor not yet start the meeting
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
