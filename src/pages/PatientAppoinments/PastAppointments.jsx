import React from 'react'
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
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const key = {
  limit: '10',
  paginationNumber: 0,
}

function PastAppointments() {
  const classes = useStyle()

  const [appointmentsList] = useCustomFecth(
    METHOD.GET,
    URL.patientPastAppointments,
    key
  )

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
    </Box>
  )
}

export default PastAppointments
