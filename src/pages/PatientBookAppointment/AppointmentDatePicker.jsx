import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Box, makeStyles, Typography } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import AvailableSlots from './AvailableSlots'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'
import useCustomFecth from '../../hooks/useCustomFetch'


const useStyle = makeStyles(() => ({
  container: {
    width: 'calc(100% - 320px)',
    height: '100%',
  },
  datePicker: {
    paddingTop: 85,
    '& .MuiPickersStaticWrapper-staticWrapperRoot': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiPickersBasePicker-pickerView': {
      minWidth: 450,
      minHeight: 400,
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      marginBottom: 10,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 28,
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
      height: 26,
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      margin: '0px 13px',
      fontSize: 16,
    },
    '& .MuiPickersDay-day': {
      margin: '2.2px 13.5px',
    },
    '& .MuiTypography-alignCenter': {
      fontSize: 18,
      color: '#656363',
      variant: 'bold',
    },
    '& .MuiTypography-body2': {
      color: '#414141',
      fontSize: 16,
    },
    '& .MuiPickersDay-dayDisabled': {
      '& p': {
        color: '#a8a8a8',
        fontSize: 16,
      },
    },
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '42px 80px 20px 300px',
  },
  confirmButton: {
    padding: '8.5px 67px',
    backgroundColor: '#0bb5ff',
    borderRadius: 25,
    textAlign: 'center',
    cursor: 'pointer',
  },
  confirmText: {
    fontSize: 16,
    color: '#f7f7f7',
    paddingTop: 2,
  },
}))

function AppointmentDatePicker({ doctorKey }) {
  const classes = useStyle()

  const history = useHistory()

  const [date, setDate] = useState(new Date())

  const selectedDate = moment(date).format('YYYY-MM-DD')

  const key = useMemo(() => {
    return {
      doctorKey: doctorKey,
      appointmentDate: selectedDate
    }
  },[doctorKey, selectedDate])

  const [time, setTime] = useState({ start: '00:00:00', end: '00:00:00' })

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  const [slots] = useCustomFecth(METHOD.GET, URL.patientAppointmentSlotsView, key)

  const handleDateChange = (event) => {
    setDate(event)
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

  const handleSlotTiming = (time) => {
    setTime(time)
  }

  return (
    <Box display="flex" className={classes.container}>
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
      {slots && (
        <AvailableSlots availableSlots={slots} handleSlotTiming={handleSlotTiming} />
      )}
    </Box>
  )
}

export default AppointmentDatePicker
