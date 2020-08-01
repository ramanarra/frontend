import React, { useMemo } from 'react'
import { Box, makeStyles } from '@material-ui/core'

import PatientAppointmentSlot from './PatientAppointmentSlot'
import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import borderColors from './constants'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 12,
    overflowY: 'auto',
  },
}))

function UpcomingAppointments({ appointmentLists }) {
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
    URL.patientUpcomingAppointments,
    params
  )

  return (
    <Box className={classes.container} display="flex" flexWrap="wrap">
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

export default UpcomingAppointments
