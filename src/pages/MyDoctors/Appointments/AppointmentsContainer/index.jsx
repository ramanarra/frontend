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
}) {
  const classes = useStyle()

  return (
    <Box className={classes.constainer}>
      {appointmentSlots ? (
        <Header
          forwardPagination={forwardPagination}
          backwardPagination={backwardPagination}
          slots={appointmentSlots}
        />
      ) : null}
      <Box display="flex" flexWrap="wrap" className={classes.scheduleList}>
        {appointmentSlots
          ? appointmentSlots.map((data, index) => {
              return <List data={data} key={index} onSave={onSave} />
            })
          : null}
      </Box>
    </Box>
  )
}

export default AppointmentContainer
