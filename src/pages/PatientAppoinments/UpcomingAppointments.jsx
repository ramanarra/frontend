import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import PatientAppointmentSlot from './PatientAppointmentSlot'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'
import borderColors from './constants'
import useAppointmentUpdate from '../../hooks/useAppointmentUpdate'
import SnackBar from '../../components/SnackBar'
import ScheduleImg from '../../assets/img/Schedule.svg'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: '1.5%',
    paddingLeft: '1%',
    paddingRight: '1%',
    overflowY: 'auto',
    '& .infinite-scroll-component__outerdiv': {
      width: '100%',
      height: '100%',
    },
  },
  scrollContainter: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  appointmentSlots: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    height: 'fit-content',
  },
  noappointmentsBox: {
    width: '100%',
    textAlign: 'center',
  },
  noappointmentsImage: {
    width: 450,
  },
  button: {
    padding: '8px 18px',
    borderRadius: 25,
    color: '#ffffff',
  },
}))

function UpcomingAppointments() {
  const classes = useStyle()

  const [open, setOpen] = useState(false)

  const history = useHistory()

  const [isRefetch, setRefetch] = useState(false)

  const [paginationNumber, setPaginationNumber] = useState(0)

  const [appointmentsList, setAppointmentsList] = useState([])

  const [updateDate, error, loading, data] = useManualFetch()

  const refetch = () => {
    setPaginationNumber(0)
    setAppointmentsList([])
    setRefetch(!isRefetch)
  }

  const [onSave, response] = useAppointmentUpdate(refetch)

  useEffect(() => {
    if (data?.appointments) {
      setAppointmentsList(appointmentsList.concat(data.appointments))
    }
  }, [data])

  useEffect(() => {
    const limit = '15'
    updateDate(
      METHOD.GET,
      `${
        URL.patientUpcomingAppointments
      }${'?limit='}${limit}${'&paginationNumber='}${paginationNumber}`
    )
  }, [paginationNumber, isRefetch])

  useEffect(() => {
    if (response) {
      setOpen(true)
    }
  }, [response])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  function handleOnClick() {
    history.push('/patient/find-doctor')
  }

  const fetchData = () => {
    setPaginationNumber(paginationNumber + 1)
  }

  return (
    <Box className={classes.container} display="flex" flexWrap="wrap">
      <InfiniteScroll
        dataLength={appointmentsList.length}
        next={fetchData}
        hasMore={true}
        height={'100%'}
        className={classes.scrollContainter}
      >
        <Box className={classes.appointmentSlots}>
          {appointmentsList &&
            appointmentsList.map((appointmentDetail, index) => {
              return (
                <PatientAppointmentSlot
                  appointmentDetail={appointmentDetail}
                  borderColor={borderColors[index % 4]}
                  key={index}
                  onSave={onSave}
                  past={false}
                  list={appointmentsList}
                />
              )
            })}
        </Box>
        {appointmentsList &&
          (appointmentsList.length === 0 || appointmentsList.statusCode === 204) && (
            <Box className={classes.noappointmentsBox}>
              <img src={ScheduleImg} className={classes.noappointmentsImage} />
              <Box>
                <Button
                  className={classes.button}
                  style={{ backgroundColor: '#0bb5ff' }}
                  onClick={handleOnClick}
                >
                  Book Now
                </Button>
              </Box>
            </Box>
          )}
      </InfiniteScroll>
      {response && response.data?.appointment && (
        <SnackBar
          openDialog={open}
          message={'Appointment Rescheduled Sucessfully'}
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

export default UpcomingAppointments
