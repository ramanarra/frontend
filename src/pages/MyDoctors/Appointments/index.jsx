import React, { useMemo, useState, useEffect } from 'react'
import { makeStyles, Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'

import ScheduledDoctors from './ScheduledDoctors'
import { METHOD, URL } from '../../../api'
import useCustomFetch from '../../../hooks/useCustomFetch'
import useAppointmentUpdate from '../../../hooks/useAppointmentUpdate'
import AppointmentContainer from './AppointmentsContainer'
import SnackBar from '../../../components/SnackBar'
import { tr } from 'date-fns/locale'

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

  const [open, setOpen] = useState(false)


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
  )

  const [onSave, response] = useAppointmentUpdate(refetch)

  // console.log(response)

  useEffect(() => {
    if(response) {
      setOpen(true)
    }
  },[response])

  function forwardPagination() {
    setPaginationNumber(paginationNumber + 1)
  }

  function backwardPagination() {
    setPaginationNumber(paginationNumber - 1)
  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.body} display="flex">
        <ScheduledDoctors doctorDetails={doctorList} />
        <Box className={classes.schedule}>
          <AppointmentContainer
            appointmentSlots={appointmentSlots}
            doctorKey={id}
            forwardPagination={forwardPagination}
            backwardPagination={backwardPagination}
            paginationNumber={paginationNumber}
            onSave={onSave}
          />
        </Box>
      </Box>
      {
        response && response?.appointment &&
        <SnackBar openDialog={open} message={'Created Sucessfully'} onclose={handleClose} severity={'success'} />
      }
      {
        response && response?.statusCode === 417 &&
        <SnackBar openDialog={open} message={response.message} onclose={handleClose} severity={'warning'} />
      }
      {
        response && response?.statusCode === 200 &&
        <SnackBar openDialog={open} message={response.message} onclose={handleClose} severity={'success'} />
      }
      {
        response && (response?.statusCode === 404 || response?.statusCode === 400) &&
        <SnackBar openDialog={open} message={response.message} onclose={handleClose} severity={'info'} />
      }
      {
        response && response?.statusCode === 500 &&
        <SnackBar openDialog={open} message={'Internal Server Error'} onclose={handleClose} severity={'error'} />
      }
      {
        response && response.name === 'Error' &&
        <SnackBar openDialog={open} message={response.message} onclose={handleClose} severity={'error'} />
      }
    </Box>
  )
}

export default Appointment
