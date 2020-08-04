import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    width: '79px',
    background: '#0bb5ff',
  },

  item: {
    color: "#9ddcf8",
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none'
  },
  setting: {
    fontSize: 19,
    paddingTop: 14,
  },
  selectedColor: {
    color: "#f7f7f7",
  },
}))

function PatientSideBar() {
  const classes = useStyles()
  
  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path[2] 

  
  return (
    <Box className={classes.container}>
      <Box paddingTop={1}>
        <Link className={classNames(classes.item, {
              [classes.selectedColor]: pathName === 'appointments',
            })} to="/patient/appointments/upcoming"> 
          <i className="icon-doctor"></i>
        </Link>
        <Link className={classNames(classes.item, classes.setting, {
              [classes.selectedColor]: pathName === 'setting',
            })} to="/patient/setting">
          <i className="icon-settings "></i>
        </Link>
      </Box>
    </Box>
  )
}

export default PatientSideBar
