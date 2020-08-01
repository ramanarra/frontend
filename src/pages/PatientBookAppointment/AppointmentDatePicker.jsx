import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import { Box, makeStyles, Typography } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import AvailableSlots from './AvailableSlots'
import useManualFetch from '../../hooks/useManualFetch'
import { METHOD, URL } from '../../api'

const useStyle = makeStyles(() => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 235px',
    paddingTop: 30,
    paddingBottom: 10,
  },
  confirmButton: {
    padding: '12px 40px',
    backgroundColor: '#0bb5ff',
    borderRadius: 20,
    textAlign: 'center',
    cursor: 'pointer',
  },
  confirmText: {
    fontSize: 15,
    color: '#f7f7f7',
    paddingTop: 2,
  },
}))

function AppointmentDatePicker({ doctorKey }) {
  const classes = useStyle()

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
    updateData(METHOD.GET, URL.patientAppointmentSlotsView, params)
  }, [])

  const handleDateChange = (event) => {
    setDate(event)
    updateData(METHOD.GET, URL.patientAppointmentSlotsView, params)
  }

  function handlSlotTiming(time) {
    setTime(time)
  }

  return (
    <Box display="flex">
      <Box>
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
          />
        </MuiPickersUtilsProvider>
        <Box className={classes.button}>
          <Box className={classes.confirmButton}>
            <Typography className={classes.confirmText}>CONFIRM</Typography>
          </Box>
        </Box>
      </Box>
      {data && (
        <AvailableSlots availableSlots={data} handlSlotTiming={handlSlotTiming} />
      )}
    </Box>
  )
}

export default AppointmentDatePicker
