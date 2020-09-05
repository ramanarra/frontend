import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, makeStyles, Button } from '@material-ui/core'

import PatientAppointmentSlot from './PatientAppointmentSlot'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import borderColors from './constants'
import NoPastAppointments from '../../assets/img/past-appointments.svg'


const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 12,
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
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
  limit: '30',
  paginationNumber: 0,
}

function PastAppointments() {
  const classes = useStyle()

  const history = useHistory()

  const [appointmentsList] = useCustomFecth(
    METHOD.GET,
    URL.patientPastAppointments,
    key
  )

  function handleOnClick() {
    history.push('/patient/find-doctor')
  }

  return (
    <Box className={classes.container}>
      {appointmentsList &&
        appointmentsList?.appointments &&
        appointmentsList.appointments.map((appointmentDetail, index) => {
          return (
            <PatientAppointmentSlot
              appointmentDetail={appointmentDetail}
              borderColor={borderColors[index % 4]}
              key={index}
              past={true}
            />
          )
        })}
        {
          appointmentsList &&
          (appointmentsList.length === 0 || appointmentsList.StatusCode === 204) &&
          <Box className={classes.noappointmentsBox}>
          <img src={NoPastAppointments} className={classes.noappointmentsImage} />
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
        }
    </Box>
  )
}

export default PastAppointments
