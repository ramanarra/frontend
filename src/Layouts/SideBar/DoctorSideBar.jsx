import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'

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
    color: "#f7f7f7",
  },
}))

function DoctorSideaBar() {
  const classes = useStyles()
  const location = useLocation()

  const history = useHistory()

  const path = location.pathname.split('/')

  const pathName = path.length === 2 ? path[1] : ''

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
              [classes.selectedColor]: pathName === 'doctors',
            })} to="/doctors"> 
          <i className="icon-doctor"></i>
        </Link>
        <Link className={classNames(classes.item, classes.patient, {
              [classes.selectedColor]: pathName === 'patients',
            })} to="/patients">
          <i className="icon-patient "></i>
        </Link>
        <Link className={classNames(classes.item, classes.report, {
              [classes.selectedColor]: pathName === 'reports',
            })} to="/reports">
          {/* {' '} */}
          <i className="icon-progress "></i>
        </Link>
        <Link className={classNames(classes.item, classes.setting, {
              [classes.selectedColor]: pathName === 'settings',
            })} to="/settings">
          <i className="icon-settings "></i>
        </Link>
        <PowerSettingsNewIcon className={classNames(classes.item, classes.logout, {
          [classes.selectedColor]: pathName === 'logout',
        })}  onClick={handleOnLogout} />
      </Box>
    </Box>
  )
}

export default DoctorSideaBar
