import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Box, makeStyles, Typography } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import AvailableSlots from './AvailableSlots'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'


const useStyle = makeStyles(() => ({

  datePicker: {
    paddingTop: 130,
  },
  dateContainer: {
    '& .MuiPickersBasePicker-pickerView': {
      minWidth: 500,
    }
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 80px 20px 300px'
  },
  confirmButton: {
    padding: '11px 73px',
    backgroundColor: '#0bb5ff',
    borderRadius: 25,
    textAlign: 'center',
    cursor: 'pointer',
  },
  confirmText: {
    fontSize: 17,
    color: '#f7f7f7',
    paddingTop: 2,
  },
}))

function AppointmentDatePicker({ doctorKey }) {
  const classes = useStyle()

  const history = useHistory()

  const [date, setDate] = useState(new Date())

  const selectedDate = moment(date).format('YYYY-MM-DD')

  const [time, setTime] = useState({ start: '00:00:00', end: '00:00:00' })

  const params = useMemo(() => {
    return {
      doctorKey: doctorKey,
      appointmentDate: selectedDate,
    }
  }, [selectedDate, doctorKey])

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  useEffect(() => {
    updateData(
      METHOD.GET,
      `${
        URL.patientAppointmentSlotsView
      }${'?doctorKey='}${doctorKey}${'&appointmentDate='}${selectedDate}`
    )
  }, [])

  const handleDateChange = (event) => {
    setDate(event)
    const selectDate = moment(event).format('YYYY-MM-DD')
    updateData(
      METHOD.GET,
      `${
        URL.patientAppointmentSlotsView
      }${'?doctorKey='}${doctorKey}${'&appointmentDate='}${selectDate}`
    )
  }

  function handleSubmit() {
    const params = {
      patientId: Number(localStorage.getItem('patientId')),
      doctorKey: doctorKey,
      startTime: moment(time.start, 'HH:mm:ss').format('HH:mm'),
      endTime: moment(time.end, 'HH:mm:ss').format('HH:mm'),
      appointmentDate: selectedDate,
      paymentOption: 'directPayment',
      consultationMode: 'online',
    }
    updateData(METHOD.POST, URL.patientBookAppointment, params)
    history.push('/patient/appointments/upcoming')
  }

  const  handleSlotTiming = (time) => {
    setTime(time)
  }


  return (
    <Box display="flex">
      <Box className={classes.datePicker}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            autoOk
            disablePast
            disableToolbar
            orientation="landscape"
            variant="static"
            openTo="date"
            value={date}
            onChange={handleDateChange}
            className={classes.dateContainer}
          />
        </MuiPickersUtilsProvider>
        <Box className={classes.button}>
          <Box className={classes.confirmButton} onClick={handleSubmit}>
            <Typography className={classes.confirmText}>CONFIRM</Typography>
          </Box>
        </Box>
      </Box>
      {data && (
        <AvailableSlots availableSlots={data} handleSlotTiming={handleSlotTiming} />
      )}
    </Box>
  )
}

export default AppointmentDatePicker
