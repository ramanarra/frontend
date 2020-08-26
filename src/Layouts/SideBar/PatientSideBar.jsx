import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'
import appointmentIcon from '../../assets/img/appointments.svg'

const useStyles = makeStyles(() => ({
  container: {
    width: '79px',
    background: '#0bb5ff',
  },

  item: {
    color: "#9ddcf8",
    fontSize: 22,
    paddingTop: 7,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none'
  },
  appointmentIcon: {
    width: 19,
    paddingTop: 12,
    color: '#9ddcf8',
  },
  setting: {
    fontSize: 19,
    paddingTop: 14,
  },
  logout: {
    fontSize: 52,
    marginLeft: 13,
    cursor: 'pointer',
  },
  selectedColor: {
    color: "#f7f7f7",
  },
}))

function PatientSideBar() {
  const classes = useStyles()
  
  const location = useLocation()

  const history = useHistory()

  const path = location.pathname.split('/')

  const pathName = path[2] 

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  function handleOnLogout() {
    updateData(METHOD.GET, URL.logout)
  }

  if(data) {
    if(data.message === 'sucessfully loggedout') {
      localStorage.clear()
      history.push('/login')
    }
  }

  
  return (
    <Box className={classes.container}>
      <Box paddingTop={1}>
        <Link className={classNames(classes.item, {
              [classes.selectedColor]: pathName === 'appointments',
            })} to="/patient/appointments/upcoming"> 
          <img src={appointmentIcon} alt="appointment Icon" className={classNames(classes.appointmentIcon,{
            [classes.selectedColor]: pathName === 'appointments',
          })} />
        </Link>
        <Link className={classNames(classes.item, classes.setting, {
              [classes.selectedColor]: pathName === 'setting',
            })} to="/patient/setting">
          <i className="icon-settings "></i>
        </Link>
        <PowerSettingsNewIcon className={classNames(classes.item, classes.logout, {
          [classes.selectedColor]: pathName === 'logout',
        })}  onClick={handleOnLogout} />
      </Box>
    </Box>
  )
}

export default PatientSideBar
