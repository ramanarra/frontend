import React, { useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'

import useCustomFecth from '../../hooks/useCustomFetch'
import { METHOD, URL } from '../../api'
import DoctorDetails from './DoctorDetails'
import AppointmentDatePicker from './AppointmentDatePicker'
import LeftArrow from '../../assets/img/left-arrow.svg'
import messages from '../../lib/iconMsg'
import { LeftCircleArrow } from '../../components/Tooltip'

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
       <LeftCircleArrow onClick={handleOnClick} title={"Back"} placement='top' />
      {doctorDetails && <DoctorDetails doctorDetails={doctorDetails} />}
      {doctorDetails && <AppointmentDatePicker doctorKey={id} doctorDetails={doctorDetails} />}
    </Box>
  )
}

export default PatientBookAppointment
