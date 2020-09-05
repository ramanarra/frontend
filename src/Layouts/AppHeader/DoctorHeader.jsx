import React, { useState } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import Stretch from '../../components/Stretch'
import Logo from '../../assets/img/logo.png'
import HospitalLogo from '../../assets/img/hospitalLogo.png'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'

const useStyles = makeStyles(() => ({
  appBar: {
    height: 65,
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
    height: 78,
  },

  text: {
    fontSize: 13.5,
    color: '#686868',
  },

  hospitalLogoContainer: {
    marginLeft: -17,
  },

  hospitalLogo: {
    width: 33,
    paddingTop: 5,
    cursor: 'pointer',
  },

  logout: {
    position: 'absolute',
    zIndex: 1,
    right: 70,
    top: 52,
    width: 140,
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
  profileIcon: {
    width: 22,
  },
  exitIcon: {
    width: 22,
  },
}))

export default function DoctorHeader() {
  const classes = useStyles()

  const history = useHistory()

  const [open, setOpen] = useState(false)

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  function handleOnVideoClick() {
    history.push('/video-consultation')
  }

  function handleOnClick() {
    setOpen(!open)
  }

  function handleOnAwayClick() {
    setOpen(false)
  }

  function handleOnLogout() {
    updateData(METHOD.GET, URL.logout)
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
        <i className={classNames('icon-notify', classes.notificationImg)}></i>
      </Box>
      <Box className={classes.gap}>
        <Typography className={classes.text}>Amrit Medicare Pvt. Ltd.</Typography>
      </Box>
      <ClickAwayListener onClickAway={handleOnAwayClick}>
        <Box className={classes.hospitalLogoContainer}>
          <img
            src={HospitalLogo}
            alt="hospital logo"
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
    </Box>
  )
}
