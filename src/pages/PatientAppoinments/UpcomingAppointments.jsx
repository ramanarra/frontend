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

const key = {
  limit: String(10),
  paginationNumber: 0,
}

function UpcomingAppointments() {
  const classes = useStyle()

  const [appointmentsList] = useCustomFecth(
    METHOD.GET,
    URL.patientUpcomingAppointments,
    key
  )

  return (
    <Box className={classes.container} display="flex" flexWrap="wrap">
      {appointmentsList && appointmentsList?.appointments &&
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
