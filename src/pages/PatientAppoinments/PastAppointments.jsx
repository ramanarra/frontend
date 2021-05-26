import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, makeStyles, Button } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

import PatientAppointmentSlot from './PatientAppointmentSlot'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'
import borderColors from './constants'
import NoPastAppointments from '../../assets/img/past-appointments.svg'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 12,
    display: 'flex',
    flexWrap: 'wrap',
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

function PastAppointments() {
  const classes = useStyle()

  const history = useHistory()

  const [paginationNumber, setPaginationNumber] = useState(0)

  const [appointmentsList, setAppointmentsList] = useState([])

  const [updateDate, error, loading, data] = useManualFetch()

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
        URL.patientPastAppointments
      }${'?limit='}${limit}${'&paginationNumber='}${paginationNumber}`
    )
  }, [paginationNumber])

  function handleOnClick() {
    history.push('/patient/find-doctor')
  }

  const fetchData = () => {
    setPaginationNumber(paginationNumber + 1)
  }

  return (
    <Box className={classes.container}>
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
                  past={true}
                />
              )
            })}
        </Box>
        {appointmentsList &&
          (appointmentsList.length === 0 || appointmentsList.StatusCode === 204) && (
            <Box className={classes.noappointmentsBox}>
              <img
                src={NoPastAppointments}
                className={classes.noappointmentsImage}
              />
              <Box>
                {/* <Button
                  className={classes.button}
                  style={{ backgroundColor: '#0bb5ff' }}
                  onClick={handleOnClick}
                >
                  Book Now
                </Button> */}
              </Box>
            </Box>
          )}
      </InfiniteScroll>
    </Box>
  )
}

export default PastAppointments
