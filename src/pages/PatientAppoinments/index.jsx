import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, makeStyles } from '@material-ui/core'

import Header from './Header'
import UpcomingAppointments from './UpcomingAppointments'
import PastAppointments from './PastAppointments'

const useStyle = makeStyles(() => ({
  container: {
    width: '100%',
    padding: 20,
    height: '100%',
    background: '#f9f9f9',
    overflowY: 'auto',
  },
}))

function PatientAppoinments() {
  const classes = useStyle()

  const location = useLocation()

  const path = location.pathname.split('/')

  const pathName = path[3]

  return (
    <Box className={classes.container}>
      <Header />
      {pathName === 'upcoming' ? <UpcomingAppointments /> : <PastAppointments />}
    </Box>
  )
}

export default PatientAppoinments
