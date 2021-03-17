import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
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
    paddingTop: 10,
    paddingBottom: 16,
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none',
  },

  patient: {
    fontSize: 24,
  },
  report: {
    fontSize: 20,
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
    color: '#f7f7f7',
  },
}))

function DoctorSideaBar() {
  const classes = useStyles()
  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path.length === 2 ? path[1] : ''

  return (
    <Box className={classes.container}>
      <Box paddingTop={1}>
        <Link
          className={classNames(classes.item, {
            [classes.selectedColor]: pathName === 'doctors',
          })}
          to="/doctors"
        >
          <Toolmenu title={messages.appointment} placement="left">
            <i className="icon-doctor"></i>
          </Toolmenu>
        </Link>
        <Link
          className={classNames(classes.item, classes.patient, {
            [classes.selectedColor]: pathName === 'patients',
          })}
          to="/patients"
        >
          <Toolmenu title={messages.patient} placement="left">
            <i className="icon-patient "></i>
          </Toolmenu>
        </Link>
        <Link
          className={classNames(classes.item, classes.report, {
            [classes.selectedColor]: path.includes('reports'),
          })}
          to="/reports/list"
        >
          {/* {' '} */}
          <Toolmenu title={messages.report} placement="left">
            <i className="icon-progress "></i>
          </Toolmenu>
        </Link>
        <Link
          className={classNames(classes.item, classes.setting, {
            [classes.selectedColor]: pathName === 'settings',
          })}
          to="/settings"
        >
          <Toolmenu title={messages.setting} placement="left">
            <i className="icon-settings "></i>
          </Toolmenu>
        </Link>
      </Box>
    </Box>
  )
}

export default DoctorSideaBar
