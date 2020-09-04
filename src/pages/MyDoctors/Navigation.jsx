import React from 'react'
import classNames from 'classnames'
import { Box, Typography, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import Centralize from '../../components/Centralize'
import Stretch from '../../components/Stretch'
import useNavigationStyles from './useStyle'
import View from '../../assets/img/icons/view.svg'
import Filter from '../../assets/img/icons/filter.svg'
import DotMenu from '../../assets/img/icons/dot-menu.svg'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navigation = ({ doctorList }) => {
  const classes = useNavigationStyles()

  const history = useHistory()

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path[1]

  function handleAppointmentOnClick() {
    if (doctorList) {
      const { doctorKey } = doctorList
      history.push(`/appointments/${doctorKey}`)
    }
  }

  function handleDoctorOnClick() {
    history.push('/doctors')
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.right} display="flex">
        <Box
          className={classNames(classes.button, {
            [classes.selecedTab]: pathName === 'doctors',
          })}
          onClick={handleDoctorOnClick}
        >
          <i
            style={{ color: pathName === 'doctors' ? '#0bb5ff' : '#c7c7c7' }}
            className="icon-doctor"
          ></i>
          {
            localStorage.getItem('role') === 'DOCTOR' ?
            <Typography className={classes.content}>My Hospital</Typography> :
            <Typography className={classes.content}>My Doctors</Typography>
          }
        </Box>
        <Box
          className={classNames(classes.button, {
            [classes.selecedTab]: pathName === 'appointments',
          })}
          onClick={() => handleAppointmentOnClick()}
        >
          <i
            style={{ color: pathName === 'appointments' ? '#0bb5ff' : '#c7c7c7' }}
            className={classNames('icon-calendar', classes.apponitments)}
          ></i>
          <Typography className={classes.content}>Appointments</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Navigation
