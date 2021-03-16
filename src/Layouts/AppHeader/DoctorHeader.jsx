import React, { useState } from 'react'
import classNames from 'classnames'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography , Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import CreateIcon from '@material-ui/icons/Create'

import Stretch from '../../components/Stretch'
import Logo from '../../assets/img/logo.png'
import HospitalLogo from '../../assets/img/hospitalLogo.png'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'
import message from './../../lib/iconMsg'
import { NotificationTip } from '../../components/Tooltip'
import ChangePassword from '../../pages/ChangePasswordOption/ChangePasswordDialogDoctor'

const Open = true
const useStyles = makeStyles(() => ({
  appBar: {
    height: 70,
    paddingLeft: 20,
    paddingRight: 60,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd',
  },

  videoButton: {
    fontSize: 10,
    borderRadius: 20,
    boxShadow: 'none',
    padding: '6px 10px',
  },

  videoText: {
    marginLeft: 5,
  },

  gap: {
    marginRight: 20,
  },

  notificationImg: {
    fontSize: 17,
    color: '#a8a8a8',
  },

  logoImg: {
    height: 70,
  },

  text: {
    fontSize: 13.5,
    color: '#686868',
  },

  hospitalLogoContainer: {
    marginLeft: -17,
  },

  hospitalLogo: {
    width: 25,
    height: 25,
    paddingTop: 5,
    cursor: 'pointer',
  },
  changePasswordText: {
    color: '#5c5a5a',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '8px',
    fontFamily: 'product-sans-regular',
  },

  logout: {
    position: 'absolute',
    zIndex: 1,
    right: 70,
    top: 52,
    width: 160,
    padding: 5,
    backgroundColor: '#ffffff',
    border: '1px solid #c1c1c1',
    borderRadius: 5,
    '& :hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  logoutText: {
    fontSize: 14,
    cursor: 'pointer',
    paddingTop: 2.5,
    color: '#5c5a5a',
    paddingLeft: 5,
    marginLeft: 5,
  },
  edit: {
    marginLeft: 5,
    fontSize: 14,
    cursor: 'pointer',
    color: '#5c5a5a',
    paddingLeft: 5,
    paddingBottom: 2.5,
    borderBottom: '1px solid #f3f3f3',
  },
  createText: {
    marginLeft: 5,
    fontSize: 14,
    cursor: 'pointer',
    color: '#5c5a5a',
    paddingLeft: 5,
    paddingBottom: 2.5,
    borderBottom: '1px solid #f3f3f3',
  },

  createIcon: {
    width: 22,
  },
  profileIcon: {
    width: 22,
  },
  exitIcon: {
    width: 22,
  },
  backdrop: {
    zIndex: 1,
    color: '#fff',
  },
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
}))

function DoctorHeader({ socket, timer }) {
  const classes = useStyles()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [passwordDlg, setPasswordDlg] = useState(false)
  const [openSpinner, setOpenSpinner] = useState(false)
  const [updateData, updateError, isUpdating, data] = useManualFetch() 
  
  const IndividualHospitalName = useSelector(state => state.hospital.hospitalName) || window.localStorage.getItem('hospitalName')
  const hospitalProfile = useSelector(state => state.hospital.hospitalProfile) || window.localStorage.getItem('hospitalPhoto')

  function handleOnVideoClick() {
    if (socket) {
      socket.disconnect()
      clearInterval(timer)
    }
    history.push('/video-consultation')
  }

  function handleOnClick() {
    setOpen(!open)
  }

  function handleOpenDialog() {
    setPasswordDlg(true)
  }
  function handleClose() {
    setPasswordDlg(false)
  }
  function handleOnSubmit() {
    setPasswordDlg(true)
  }

  function handleOnAwayClick() {
    setOpen(false)
  }

  function handleOnLogout() {
    setOpenSpinner(true)
    updateData(METHOD.GET, URL.logout)
    clearInterval(timer)
    if (socket) {
      socket.disconnect()
    }
  }

  if (data) {
    if (data.message === 'sucessfully loggedout') {
      localStorage.clear()
      history.push('/doctor/login')
    }
  }

  function handleOnEdit() {
    history.push('/settings')
    setOpen(false)
  }

  return (
    <Box className={classes.appBar}>
      <img className={classes.logoImg} src={Logo} alt="logo" />
      <Stretch />
      {localStorage.getItem('role') === 'DOCTOR' && (
        <Box className={classes.gap}>
          <Button
            className={classes.videoButton}
            variant="contained"
            color="primary"
          >
            <i className="icon-video "></i>
            <span onClick={handleOnVideoClick} className={classes.videoText}>
              VIDEO CONSULTATION
            </span>
          </Button>
        </Box>
      )}

        <Box className={classes.gap}>
          <NotificationTip  title={message.notification} placement="bottom" />
        </Box>
    
      <Box className={classes.gap}>
        <Typography className={classes.text}>{IndividualHospitalName}</Typography>
      </Box>
      <ClickAwayListener onClickAway={handleOnAwayClick}>
        <Box className={classes.hospitalLogoContainer}>
          {localStorage.getItem('role') === 'DOCTOR' && (
          <Avatar
            src={hospitalProfile}
            alt="hospital logo"
            className={classes.hospitalLogo}
            onClick={handleOnClick}
          />
          )} 
          {localStorage.getItem('role') === 'ADMIN' && (
          <Avatar
            src={hospitalProfile}
            alt="hospital logo"
            className={classes.hospitalLogo}
            onClick={handleOnClick}
          />
          )}
          {open && (
            <Box className={classes.logout}>
              <Box display="flex">
                <AccountBoxIcon className={classes.profileIcon} />
                <Typography className={classes.edit} onClick={handleOnEdit}>
                  Edit Profile
                </Typography>
              </Box>
              <Box display="flex">
                <CreateIcon className={classes.createIcon} />
                <Typography
                  className={classes.logoutText}
                  onClick={handleOpenDialog}
                >
                  Change Password
                </Typography>
              </Box>
              <Box display="flex">
                <ExitToAppIcon className={classes.exitIcon} />
                <Typography className={classes.logoutText} onClick={handleOnLogout}>
                  Logout
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
      {openSpinner && (
        <Backdrop className={classes.backdrop} open={openSpinner}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {passwordDlg && (
        <ChangePassword
          open={true}
          handleClose={handleClose}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.doctor.socket,
    timer: state.doctor.timer,
  }
}

export default connect(mapStateToProps, null)(DoctorHeader)
