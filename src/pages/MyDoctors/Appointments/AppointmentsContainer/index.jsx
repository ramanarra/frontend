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
  appointmentSlot,
  forwardPagination,
  backwardPagination,
  onSave,
}) {
  const classes = useStyle()

  return (
    <Box className={classes.constainer}>
      {appointmentSlot ? (
        <Header
          forwardPagination={forwardPagination}
          backwardPagination={backwardPagination}
          slots={appointmentSlot}
        />
      ) : null}
      <Box display="flex" flexWrap="wrap" className={classes.scheduleList}>
        {appointmentSlot
          ? appointmentSlot.map((data, index) => {
              return <List data={data} key={index} onSave={onSave} />
            })
          : null}
      </Box>
    </Box>
  )
}

export default AppointmentContainer
