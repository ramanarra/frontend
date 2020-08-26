import React from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

import Stretch from '../../components/Stretch'
import Logo from '../../assets/img/logo.png'
import HospitalLogo from '../../assets/img/hospitalLogo.png'


const useStyles = makeStyles(() => ({
  appBar: {
    height: 65,
    paddingLeft: 20,
    paddingRight: 70,
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #dddddd',
  },

  searchDoctorButton: {
    fontSize: 9.5,
    borderRadius: 19,
    boxShadow: 'none',
    padding: '2px 6px',
  },

  searchIcon: {
    width: 18,
    paddingTop: 2,
    marginLeft: 6,
  },

  findDoctorText: {
    marginRight: 5,
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
    width: 30,
    paddingTop: 5,
  },
}))

export default function PatientHeader() {
  const classes = useStyles()

  const history = useHistory()

  function handleFindDoctor() {
      history.push('/patient/find-doctor')
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
          <SearchRoundedIcon className={classes.searchIcon} />
          <span className={classes.findDoctorText}>FIND DOCTOR</span>
        </Button>
      </Box>
      <Box className={classes.gap}>
        <i className={classNames('icon-notify', classes.notificationImg)}></i>
      </Box>
      <Box className={classes.gap}>
        <Typography className={classes.text}>Aravindaswamy</Typography>
      </Box>
      <Box className={classes.hospitalLogoContainer}>
        <img
          src={HospitalLogo}
          alt="hospital logo"
          className={classes.hospitalLogo}
        />
      </Box>
    </Box>
  )
}
