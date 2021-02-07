import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import Stretch from '../../components/Stretch'
import Logo from '../../assets/img/logo.png'
import appointmentIcon from '../../assets/img/appointmentIcon.svg'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'
import message from './../../lib/iconMsg'
import { NotificationTip } from '../../components/Tooltip'

const useStyles = makeStyles(() => ({
  appBar: {
    height: 70,
    paddingLeft: 20,
    paddingRight: 50,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd',
  },

  searchDoctorButton: {
    fontSize: 10,
    borderRadius: 19,
    boxShadow: 'none',
    padding: '2px 7px',
  },

  searchIcon: {
    width: 15.5,
    marginBottom: 4,
    marginTop: 4,
    marginLeft: 6,
  },

  findDoctorText: {
    marginRight: 5,
    paddingLeft: 6,
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
    cursor: 'pointer',
    marginLeft: 10,
    height: 23,
    width: 23,
  },

  logout: {
    position: 'absolute',
    zIndex: 1,
    right: 70,
    width: 140,
    padding: 5,
    backgroundColor: '#ffffff',
    border: '1px solid #c1c1c1',
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
    fontSize: 14,
    cursor: 'pointer',
    color: '#5c5a5a',
    paddingLeft: 5,
    paddingBottom: 2.5,
    borderBottom: '1px solid #f3f3f3',
    marginLeft: 5,
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
  }
}))

function PatientHeader({socket}) {
  const classes = useStyles()

  const history = useHistory()

  const [open, setOpen] = useState(false)

  const [openSpinner, setOpenSpinner] = useState(false)

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  const patientName = useSelector(state => state.patient.patientName) || localStorage.getItem('patientName')
  const patientProfile = useSelector(state => state.patient.patientProfile) || localStorage.getItem('photo')

  function handleFindDoctor() {
    history.push('/patient/find-doctor')
  }

  function handleOnClick() {
    setOpen(!open)
  }

  function handleOnAwayClick() {
    setOpen(false)
  }

  function handleOnLogout() {
    setOpenSpinner(true)
    updateData(METHOD.GET, URL.logout)
    if(socket) {
      socket.disconnect()
    }
  }

  if (data) {
    if (data.message === 'sucessfully loggedout') {
      localStorage.clear()
      history.push('/login')
    }
  }

  function handleOnEdit() {
    history.push({
      pathname: '/patient/setting',
      routerName: 'Edit profile',
    })
    setOpen(false)
  }

  return (
    <Box className={classes.appBar}>
      <img className={classes.logoImg} src={Logo} alt="logo" />
      <Stretch />
      <Box className={classes.gap}>
        <Button
          className={classes.searchDoctorButton}
          variant="contained"
          color="primary"
          onClick={handleFindDoctor}
        >
          <img src={appointmentIcon} className={classes.searchIcon} />
          <span className={classes.findDoctorText}>BOOK APPOINTMENT</span>
        </Button>
      </Box>
      <Box className={classes.gap}>
      <NotificationTip title={message.notification} placement="bottom" />
      </Box>
      <Box className={classes.gap}>
        <Typography className={classes.text}>
        {patientName}
        </Typography>
      </Box>
      <ClickAwayListener onClickAway={handleOnAwayClick}>
        <Box className={classes.hospitalLogoContainer}>
          <Avatar
            src={patientProfile}
            className={classes.hospitalLogo}
            onClick={handleOnClick}
          />
          {open && (
            <Box className={classes.logout}>
              <Box display="flex">
                <AccountBoxIcon className={classes.profileIcon} />
                <Typography className={classes.edit} onClick={handleOnEdit}>
                  Edit Profile
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
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.doctor.socket,
    timer: state.doctor.timer,
  }
}

export default connect(mapStateToProps, null)(PatientHeader);
