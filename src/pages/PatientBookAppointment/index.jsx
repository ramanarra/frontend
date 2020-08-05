import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'

import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import DoctorDetails from './DoctorDetails'
import AppointmentDatePicker from './AppointmentDatePicker'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    padding: 20,
  },
}))

function PatientBookAppointment() {
  const classes = useStyle()

  const { id } = useParams()

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  }, [id])

  const [doctorDetails] = useCustomFecth(METHOD.GET, URL.viewDoctorDetails, key)

  return (
    <Box className={classes.container} display="flex">
      {doctorDetails && <DoctorDetails doctorDetails={doctorDetails} />}
      <AppointmentDatePicker doctorKey={id} />
    </Box>
  )
}

export default PatientBookAppointment
