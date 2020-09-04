import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import PatientAppointmentSlot from './PatientAppointmentSlot'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import borderColors from './constants'
import useAppointmentUpdate from '../../hooks/useAppointmentUpdate'
import SnackBar from '../../components/SnackBar'
import ScheduleImg from '../../assets/img/Schedule.svg'


const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 12,
    overflowY: 'auto',
  },
  noappointmentsBox: {
    width: '100%',
    textAlign: 'center',
  },
  noappointmentsImage: {
    width: 450,
  },
  button: {
    padding: '8px 18px',
    borderRadius: 25,
    color: '#ffffff',
  },
}))

const key = {
  limit: String(30),
  paginationNumber: 0,
}

function UpcomingAppointments() {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const history = useHistory()

  const [appointmentsList, refetch] = useCustomFecth(
    METHOD.GET,
    URL.patientUpcomingAppointments,
    key
  )

  const [onSave, response] = useAppointmentUpdate(refetch)

  useEffect(() => {
    if (response) {
      setOpen(true)
    }
  }, [response])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  function handleOnClick() {
    history.push('/patient/find-doctor')
  }

  return (
    <Box className={classes.container} display="flex" flexWrap="wrap">
      {appointmentsList &&
        appointmentsList?.appointments &&
        appointmentsList.appointments.map((appointmentDetail, index) => {
          return (
            <PatientAppointmentSlot
              appointmentDetail={appointmentDetail}
              borderColor={borderColors[index % 4]}
              key={index}
              onSave={onSave}
              past={false}
            />
          )
        })}
      {appointmentsList && (appointmentsList.length === 0 || appointmentsList.statusCode === 204) && (
        <Box className={classes.noappointmentsBox}>
          <img src={ScheduleImg} className={classes.noappointmentsImage} />
          <Box>
            <Button
              className={classes.button}
              style={{ backgroundColor: '#0bb5ff' }}
              onClick={handleOnClick}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      )}
      {response && response.data?.appointment && (
        <SnackBar
          openDialog={open}
          message={'Created Sucessfully'}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      {(response && response.name === 'Error' && response.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (response && response.name === 'Error' && response.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
      {(response &&
        response.data?.statusCode &&
        response.data?.statusCode === 200 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'success'}
          />
        )) ||
        (response && response.data?.statusCode === 404 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'info'}
          />
        )) ||
        (response && response.data?.statusCode === 400 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'info'}
          />
        )) ||
        (response && response.data?.statusCode === 502 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'error'}
          />
        )) ||
        (response && response.data?.statusCode && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onClose={handleClose}
            severity={'error'}
          />
        ))}
    </Box>
  )
}

export default UpcomingAppointments
