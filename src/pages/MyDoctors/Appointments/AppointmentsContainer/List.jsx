import React from 'react'
import { Box, Typography } from '@material-ui/core'
import moment from 'moment'

import Slots from './Slots'
import useStyle from './useListStyle'
import CancelAndRescheduleModal from './CancelAndRescheduleModal'
import FreeSlotModal from './FreeSlotModal'

function List({ data, onSave }) {
  const classes = useStyle()

  const date = moment.utc(data.day)

  const currentDate = date.format('DD')

  const currentDay = date.format('dddd')

  const todayDate = date.format('DD/MM/YYYY')

  return (
    <Box className={classes.container}>
      <Box>
        <Typography className={classes.date}>{currentDate}</Typography>
        <Typography className={classes.day}>{currentDay}</Typography>
      </Box>
        {data.slots.map(data => {
            return (
                data.id ? (
                    data.created_by === 'DOCTOR' ? (
                      <Slots
                        slot={data}
                        date={todayDate}
                        onSave={onSave}
                        name={data.patientname}
                        bgColor={'#e4f5fd'}
                        txtColor={'#0bb5ff'}
                        ModalComponent={CancelAndRescheduleModal}
                        bookedBy={'Doctor'}
                        note={'Doctor Booked appointment (payment through online) - yet to pay'}
                      />
                    ) : (
                      <Slots
                        slot={data}
                        date={todayDate}
                        onSave={onSave}
                        name={data.patientname}
                        bgColor={'#f1f3f5'}
                        txtColor={'#aab5c2'}
                        ModalComponent={CancelAndRescheduleModal}
                        bookedBy={'Patient'}
                        note={'Patient Booked - Payment made through Virujh'}
                      />
                    )
                  ) : (
                    <Slots
                        slot={data}
                        date={todayDate}
                        onSave={onSave}
                        name={'FREE SLOT'}
                        bgColor={'#e0f9ea'}
                        txtColor={'#4edb88'}
                        ModalComponent={FreeSlotModal}
                    />
                  )
            ) })}
    </Box>
  )
}

export default List
