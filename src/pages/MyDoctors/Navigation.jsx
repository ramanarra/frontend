import React, { useState } from 'react'
import classNames from 'classnames'
import { useLocation, useHistory } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import useNavigationStyles from './useStyle'
import { setOpenSideBar } from '../../actions/doctor'
import AddDoctor from '../MyDoctors/AddDoctor/index'
import './style.scss'

const Navigation = ({ doctorList, contentRefresh }) => {

  const classes = useNavigationStyles()

  const history = useHistory()

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path[1]

  const [Open, setOpen] = useState(false)

  const [change, setChange] = useState(true)


  function handleAppointmentOnClick() {
    if (doctorList) {
      const { doctorKey } = doctorList
      history.push(`/appointments/${doctorKey}`)
    }
  }

  function handleDoctorOnClick() {
    history.push('/doctors')
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);

    contentRefresh();
  }



  function handleAddDoctor() {
    setChange(!change)
    console.log(change)
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
              <Typography className={classes.content} onClick={handleAddDoctor}>My Doctors</Typography>
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
          <Typography className={classes.content} onClick={handleAddDoctor}>Appointments</Typography>
        </Box>

        {
          localStorage.getItem('role') !== 'DOCTOR' && pathName === 'doctors' &&
          <Box>
            <Button className={classes.contentlast} style={{ backgroundColor: 'rgb(11, 181, 255)' }}
              onClick={handleOpen}>Add Doctor</Button>
            {
              Open &&
              <AddDoctor
                handleClose={handleClose}
              />
            }
          </Box>
        }

      </Box>

    </Box>
  )
}

export default Navigation
