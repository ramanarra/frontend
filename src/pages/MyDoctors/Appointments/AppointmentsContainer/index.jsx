import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

import NoAppoinmentsImg from '../../../../assets/img/No-Appoinments.svg'
import Header from './Header'
import List from './List'

const useStyle = makeStyles(() => ({
  constainer: {
    height: '100%',
  },
  scheduleList: {
    height: 'calc(100% - 70px)',
  },
  imgContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  noAppoinmentsImg: {
    height: '100%',
  }
}))

function AppointmentContainer({
  appointmentSlots,
  forwardPagination,
  doctorKey,
  backwardPagination,
  onSave,
  paginationNumber,
}) {
  const classes = useStyle()

  return (
    <Box className={classes.constainer}>
      { appointmentSlots?.length > 0 && <Header
        forwardPagination={forwardPagination}
        backwardPagination={backwardPagination}
        slots={appointmentSlots}
        paginationNumber={paginationNumber}
      /> }
      <Box display="flex" flexWrap="wrap" className={classes.scheduleList}>
        {appointmentSlots?.message === 'Content Not Available' ? (
          <Box className={classes.imgContainer}>
            <img
              src={NoAppoinmentsImg}
              alt="No-Appoinments"
              className={classes.noAppoinmentsImg}
            />
          </Box>
        ) : (
          appointmentSlots?.length > 0 &&
          appointmentSlots.map((slot, index) => {
            return (
              <List
                doctorKey={doctorKey}
                appointments={slot}
                key={index}
                onSave={onSave}
              />
            )
          })
        )}
      </Box>
    </Box>
  )
}

export default AppointmentContainer
