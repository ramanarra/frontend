import React, { useState } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import Stretch from '../../components/Stretch'
import Logo from '../../assets/img/logo.png'
import appointmentIcon from '../../assets/img/appointmentIcon.svg'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'

const useStyles = makeStyles(() => ({
  appBar: {
    height: 65,
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
}))

export default function PatientHeader() {
  const classes = useStyles()

  const history = useHistory()

  const [open, setOpen] = useState(false)

  const [updateData, updateError, isUpdating, data] = useManualFetch()

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
    updateData(METHOD.GET, URL.logout)
  }

  if (data) {
    if (data.message === 'sucessfully loggedout') {
      localStorage.clear()
      history.push('/login')
    }
  }

  function handleOnEdit() {
    history.push('/patient/setting')
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
        <i className={classNames('icon-notify', classes.notificationImg)}></i>
      </Box>
      <Box className={classes.gap}>
        <Typography className={classes.text}>
          {localStorage.getItem('patientName')}
        </Typography>
      </Box>
      <ClickAwayListener onClickAway={handleOnAwayClick}>
        <Box className={classes.hospitalLogoContainer}>
          <Avatar
            src={localStorage.getItem('photo')}
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
