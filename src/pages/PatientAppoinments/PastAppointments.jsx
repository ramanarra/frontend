import React, { useMemo } from 'react'
import { Box, makeStyles } from '@material-ui/core'

import PatientAppointmentSlot from './PatientAppointmentSlot'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import borderColors from './'

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
}))

function PastAppointments() {
  const classes = useStyle()

  const key = useMemo(() => {
    return localStorage.getItem('patientId')
  })

  const params = {
    limit: String(6),
    paginationNumber: 0,
  }

  const [appointmentsList] = useCustomFecth(
    METHOD.GET,
    URL.patientPastAppointments,
    params
  )

  return (
    <Box className={classes.container}>
      {appointmentsList &&
        appointmentsList.appointments.map((appointmentDetail, index) => {
          return (
            <PatientAppointmentSlot
              appointmentDetail={appointmentDetail}
              borderColor={borderColors[index % 4]}
              key={index}
            />
          )
        })}
    </Box>
  )
}

export default PastAppointments
