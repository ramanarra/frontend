import React, { useMemo, useState } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import ScheduledDoctors from './ScheduledDoctors'
import { METHOD, URL } from '../../../api'
import useCustomFetch from '../../../hooks/useCustomFetch'
import useAppointmentUpdate from '../../../hooks/useAppointmentUpdate'
import AppointmentContainer from './AppointmentsContainer'

const useStyles = makeStyles(() => ({
  container: {
    height: 'calc(100% - 95px)',
    marginTop: 20,
  },
  body: {
    width: '98%',
    background: '#f9f9f9',
    display: 'flex',
    backgroundColor: 'white',
    boxShadow: '5px 0px 15px 0px #f3eeee',
    height: '100%',
    overflow: 'auto',
  },
  schedule: {
    width: '98%',
    height: '100%',
  },
}))

function Appointment({ doctorList }) {
  const classes = useStyles()

  const { id } = useParams()

  const [paginationNumber, setPaginationNumber] = useState(0)

  const key = useMemo(() => {
    return {
      doctorKey: id,
      paginationNumber: paginationNumber,
    }
  }, [id, paginationNumber])

  const [appointmentSlots, refetch] = useCustomFetch(
    METHOD.GET,
    URL.appointmentSlotsView,
    key,
    true
  )

  const [onSave] = useAppointmentUpdate(refetch)

  function forwardPagination() {
    setPaginationNumber(paginationNumber + 1)
  }

  function backwardPagination() {
    setPaginationNumber(paginationNumber - 1)
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.body} display="flex">
        <ScheduledDoctors doctorDetails={doctorList} />
        <Box className={classes.schedule}>
          <AppointmentContainer
            appointmentSlots={appointmentSlots}
            forwardPagination={forwardPagination}
            backwardPagination={backwardPagination}
            onSave={onSave}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Appointment
