import React, { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, Box } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import ScheduledDoctors from './ScheduledDoctors'
import { METHOD, URL } from '../../../api'
import useCustomFetch from '../../../hooks/useCustomFetch'
import useAppointmentUpdate from '../../../hooks/useAppointmentUpdate'
import AppointmentContainer from './AppointmentsContainer'
import SnackBar from '../../../components/SnackBar'
import OverBooking from './AppointmentsContainer/FreeSlotModal/OverBookingDialog'

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
  backdrop: {
    zIndex: 1,
    color: '#fff',
  },
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  }
}))

function Appointment({ doctorList, socket, timer }) {
  const classes = useStyles()

  const { id } = useParams()

  const [paginationNumber, setPaginationNumber] = useState(0)

  const [open, setOpen] = useState(false)

  const [openLoader, setOpenLoader] = useState(true)

  useEffect(() => {
    if (socket) {
      socket.disconnect()
      clearInterval(timer)
    }
  }, [])

  const key = useMemo(() => {
    return {
      doctorKey: id,
      paginationNumber: paginationNumber,
    }
  }, [id, paginationNumber])

  const [appointmentSlots, refetch] = useCustomFetch(
    METHOD.GET,
    URL.appointmentSlotsView,
    key
  )

  const [onSave, response] = useAppointmentUpdate(refetch)

  useEffect(() => {
    if (response) {
      setOpen(true)
    }
  }, [response])

  function forwardPagination() {
    setPaginationNumber(paginationNumber + 1)
  }

  function backwardPagination() {
    setPaginationNumber(paginationNumber - 1)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.body} display="flex">
        <ScheduledDoctors doctorDetails={doctorList} />
        <Box className={classes.schedule}>
          {appointmentSlots && (
            <AppointmentContainer
              appointmentSlots={appointmentSlots}
              doctorKey={id}
              forwardPagination={forwardPagination}
              backwardPagination={backwardPagination}
              paginationNumber={paginationNumber}
              onSave={onSave}
            />
          )}
        </Box>
        {openLoader && !appointmentSlots && (
          <Backdrop className={classes.backdrop} open={openLoader}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
      </Box>
      {response && response.data?.appointment && (
        <SnackBar
          openDialog={open}
          message={'Created Sucessfully'}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      {(response && response.name === 'Error' && response.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (response && response.name === 'Error' && response.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
      {(response &&
        response.data?.statusCode &&
        response.data?.statusCode === 200 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'success'}
          />
        )) ||
        (response && response.data?.statusCode === 404 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'info'}
          />
        )) ||
        (response && response.data?.statusCode === 400 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'info'}
          />
        )) ||
        (response && response.data?.statusCode === 502 && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onclose={handleClose}
            severity={'error'}
          />
        )) ||
        (response && response.data?.statusCode === 417 && (
          <OverBooking
            open={open}
            onCloseDialog={handleClose}
            data={response.config.data}
            onSave={onSave}
          />
        )) ||
        (response && response.data?.statusCode && (
          <SnackBar
            openDialog={open}
            message={response.data.message}
            onClose={handleClose}
            severity={'error'}
          />
        ))}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    socket: state.doctor.socket,
    timer: state.doctor.timer,
  }
}

export default connect(mapStateToProps, null)(Appointment)
