import React, { useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'

import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import DoctorDetails from './DoctorDetails'
import AppointmentDatePicker from './AppointmentDatePicker'
import LeftArrow from '../../assets/img/left-arrow.svg'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    padding: 20,
  },
  leftArrow: {
    width: 20,
    cursor: 'pointer',
    height: '3.7%',
    marginTop: 3,
  },
}))

function PatientBookAppointment() {
  const classes = useStyle()

  const { id } = useParams()

  const history = useHistory()

  const key = useMemo(() => {
    return {
      doctorKey: id,
    }
  }, [id])

  const [doctorDetails] = useCustomFecth(METHOD.GET, URL.viewDoctorDetails, key)

  function handleOnClick() {
    history.push('/patient/find-doctor')
  }

  return (
    <Box className={classes.container} display="flex">
      <img src={LeftArrow} alt="Left Arrow" className={classes.leftArrow} onClick={handleOnClick} />
      {doctorDetails && <DoctorDetails doctorDetails={doctorDetails} />}
      <AppointmentDatePicker doctorKey={id} />
    </Box>
  )
}

export default PatientBookAppointment
