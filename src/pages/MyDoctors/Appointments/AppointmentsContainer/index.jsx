import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

import Header from './Header'
import List from './List'

const useStyle = makeStyles(() => ({
  constainer: {
    height: '100%',
  },
  scheduleList: {
    height: 'calc(100% - 70px)',
  },
}))

function AppointmentContainer({
  appointmentSlots,
  forwardPagination,
  backwardPagination,
  onSave,
  paginationNumber,
}) {
  const classes = useStyle()

  if (appointmentSlots?.message === 'Content Not Available') {
    return null
  }

  return (
    <Box className={classes.constainer}>
      {appointmentSlots ? (
        <Header
          forwardPagination={forwardPagination}
          backwardPagination={backwardPagination}
          slots={appointmentSlots}
          paginationNumber={paginationNumber}
        />
      ) : null}
      <Box display="flex" flexWrap="wrap" className={classes.scheduleList}>
        {appointmentSlots
          ? appointmentSlots.map((slot, index) => {
              return <List appointments={slot} key={index} onSave={onSave} />
            })
          : null}
      </Box>
    </Box>
  )
}

export default AppointmentContainer
