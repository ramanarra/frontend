import React from 'react'
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import appointmentIcon from '../../assets/img/appointments.svg'
import { Toolmenu } from '../../components/Tooltip'
import messages from '../../lib/iconMsg'

const useStyles = makeStyles(() => ({
  container: {
    width: '79px',
    background: '#0bb5ff',
  },

  item: {
    color: '#9ddcf8',
    fontSize: 22,
    paddingTop: 7,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none',
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
  report: {
    fontSize: 20,
    paddingTop: 14,
  },
  logout: {
    fontSize: 52,
    marginLeft: 13,
    cursor: 'pointer',
  },
  selectedColor: {
    color: '#f7f7f7',
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
        <Link
          className={classNames(classes.item, {
            [classes.selectedColor]: pathName === 'appointments',
          })}
          to="/patient/appointments/upcoming"
        >
          <Toolmenu title={messages.appointment} placement="left">
            <img
              src={appointmentIcon}
              alt="appointment Icon"
              className={classNames(classes.appointmentIcon, {
                [classes.selectedColor]: pathName === 'appointments',
              })}
            />
          </Toolmenu>
        </Link>
        <Link
          className={classNames(classes.item, classes.setting, {
            [classes.selectedColor]: pathName === 'setting',
          })}
          to="/patient/setting"
        >
          <Toolmenu title={messages.setting} placement="left">
            <i className="icon-settings "></i>
          </Toolmenu>
        </Link>
        <Link
          className={classNames(classes.item, classes.report, {
            [classes.selectedColor]: pathName === 'reports',
          })}
          to="/patient/reports"
        >
          <Toolmenu title={messages.report} placement="left">
            <i className="icon-progress "></i>
          </Toolmenu>
        </Link>
      </Box>
    </Box>
  )
}

export default PatientSideBar
