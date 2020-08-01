import React from 'react'
import { Box, Typography } from '@material-ui/core'
import moment from 'moment'

import Slots from './Slots'
import useStyle from './useListStyle'
import CancelAndRescheduleModal from './CancelAndRescheduleModal'
import FreeSlotModal from './FreeSlotModal'

function isSingleStar(slot) {
  return (
    !slot.ispaid &&
    (slot.paymentoption.toLowerCase() === 'onlinecollection' ||
      slot.paymentoption.toLowerCase() === 'notRequired')
  )
}

function isDoubleStar(slot) {
  return !slot.ispaid && slot.paymentoption.toLowerCase() === 'directpayment'
}

function addNote(slot) {
  if (isSingleStar(slot)) {
    return 'Doctor Booked appointment (payment through online) - yet to pay'
  }

  if (isDoubleStar(slot)) {
    return 'Doctor Booked appointment (Direct Payment / Not Requried)'
  }

  return 'Doctor Booked Appointment (Payment through Virujh) - Paid'
}

function addNoteForCancle(slot) {
  if (isSingleStar(slot)) {
    return 'The appointment has been cancelled as no money transactions here.'
  }

  if (isDoubleStar(slot)) {
    return 'Any payment queries patient will reach doctor/hospital.'
  }

  return 'The payment will be refunded to the patient.'
}

function List({ appointments, onSave, doctorKey }) {
  const classes = useStyle()

  const date = moment.utc(appointments.day)

  const currentDate = date.format('DD')

  const currentDay = date.format('dddd')

  const todayDate = date.format('DD/MM/YYYY')

  return (
    <Box className={classes.container}>
      <Box>
        <Typography className={classes.date}>{currentDate}</Typography>
        <Typography className={classes.day}>{currentDay}</Typography>
      </Box>
      {appointments.slots.map((slot) => {
        return slot.id ? (
          slot.created_by === 'PATIENT' ? (
            <Slots
              doctorKey={doctorKey}
              slot={slot}
              date={todayDate}
              onSave={onSave}
              name={slot.patientFirstName}
              bgColor={'#f1f3f5'}
              textColor={'#aab5c2'}
              ModalComponent={CancelAndRescheduleModal}
              bookedBy={'Patient'}
              note={'Patient Booked - Payment made through Virujh'}
            />
          ) : (
            <Slots
              doctorKey={doctorKey}
              slot={slot}
              date={todayDate}
              onSave={onSave}
              name={slot.patientFirstName}
              bgColor={'#e4f5fd'}
              textColor={'#0bb5ff'}
              ModalComponent={CancelAndRescheduleModal}
              bookedBy={'Doctor'}
              singleStar={isSingleStar(slot)}
              doubleStar={isDoubleStar(slot)}
              note={addNote(slot)}
              cancellationNote={addNoteForCancle(slot)}
            />
          )
        ) : (
          <Slots
            doctorKey={doctorKey}
            slot={slot}
            date={todayDate}
            onSave={onSave}
            name={'FREE SLOT'}
            bgColor={'#e0f9ea'}
            textColor={'#4edb88'}
            ModalComponent={FreeSlotModal}
          />
        )
      })}
    </Box>
  )
}

export default List
