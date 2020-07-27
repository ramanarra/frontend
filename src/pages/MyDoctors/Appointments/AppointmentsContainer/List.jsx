import React from 'react'
import { Box, Typography } from '@material-ui/core'
import moment from 'moment'

import Slots from './Slots'
import useStyle from './useListStyle'
import CancelAndRescheduleModal from './CancelAndRescheduleModal'
import FreeSlotModal from './FreeSlotModal'

function isSingleStar(data) {
  return (
    !data.ispaid &&
    (data.paymentoption.toLowerCase() === 'onlinecollection' ||
      data.paymentoption.toLowerCase() === 'notRequired')
  )
}

function isDoubleStar(data) {
  return !data.ispaid && data.paymentoption.toLowerCase() === 'directpayment'
}

function addedNote(data) {
  if (isSingleStar(data)) {
    return 'Doctor Booked appointment (payment through online) - yet to pay'
  }

  if (isDoubleStar(data)) {
    return 'Doctor Booked appointment (Direct Payment / Not Requried)'
  }

  return 'Doctor Booked Appointment (Payment through Virujh) - Paid'
}

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
      {data.slots.map((data) => {
        return data.id ? (
          data.created_by === 'DOCTOR' ? (
            <Slots
              slot={data}
              date={todayDate}
              onSave={onSave}
              name={data.patientFirstName}
              bgColor={'#e4f5fd'}
              txtColor={'#0bb5ff'}
              ModalComponent={CancelAndRescheduleModal}
              bookedBy={'Doctor'}
              singleStar={isSingleStar(data)}
              doubleStar={isDoubleStar(data)}
              note={addedNote(data)}
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
      })}
    </Box>
  )
}

export default List
