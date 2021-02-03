import React, { useState, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Box, Typography } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import AvailableSlots from './AvailableSlots'
import useManualFetch from '../../hooks/useManualFetch'
import axios, { METHOD, URL } from '../../api'
import useCustomFecth from '../../hooks/useCustomFetch'
import SnackBar from '../../components/SnackBar'
import OverBooking from './OverBookingDialog'
import useStyle from './useDatePickerStyle'

function AppointmentDatePicker({ doctorKey, doctorDetails }) {
  const classes = useStyle()

  const history = useHistory()

  const patientId = localStorage.getItem('patientId')

  const [date, setDate] = useState(new Date())

  const [open, setOpen] = useState(false)

  const [openConfirmation, setOpenConfirmation] = useState()

  const [error, setError] = useState(false)

  const [time, setTime] = useState({ start: '', end: '' })

  const [confirmation, setConfirmation] = useState(true)

  const [overBookingConfirmation, setOverBookingConfirmation] = useState(false)

  const selectedDate = moment(date).format('YYYY-MM-DD')

  const [patientDetails] = useCustomFecth(METHOD.GET, `${URL.patientViewDetails}${'?patientId='}${patientId}`)

  const key = useMemo(() => {
    return {
      doctorKey: doctorKey,
      appointmentDate: selectedDate,
      confirmation: confirmation,
    }
  }, [doctorKey, selectedDate])

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  const [
    updateOverBooking,
    updateOverBookingError,
    isoverBookingUpdating,
    overBookingResponse,
  ] = useManualFetch()

  const [
    updateRazerPay,
    updateRazerPayError,
    isRazerPayUpdating,
    razerPayResponse,
  ] = useManualFetch()

  const [slots] = useCustomFecth(METHOD.POST, URL.patientAppointmentSlotsView, key)

  useEffect(() => {
    if (overBookingResponse?.statusCode === 400) {
      setOpenConfirmation(true)
    }
  }, [overBookingResponse])

  useEffect(() => {
    if (overBookingResponse?.statusCode === 200) {
      onRazorpay()
    }
  }, [overBookingResponse])

  useEffect(() => {
    if (razerPayResponse?.statusCode === 200) {
      onBookAppoinment()
    }
  }, [razerPayResponse])

  useEffect(() => {
    setOpen(true)
  }, [slots])

  const onBookAppoinment = () => {
    const params = {
      patientId: Number(localStorage.getItem('patientId')),
      doctorKey: doctorKey,
      startTime: moment(time.start, 'HH:mm:ss').format('HH:mm'),
      endTime: moment(time.end, 'HH:mm:ss').format('HH:mm'),
      appointmentDate: moment(slots.date).format('YYYY-MM-DD'),
      paymentOption: 'directPayment',
      consultationMode: 'online',
      paymentId: razerPayResponse?.paymentId,
      confirmation: overBookingConfirmation,
    }

    updateData(METHOD.POST, URL.patientBookAppointment, params)
    setOpen(true)
  }
  const onRazorpay = async () => {
    const token = localStorage.getItem('virujhToken')
    const authStr = 'Bearer '.concat(token)
    const params = { amount: Number(doctorDetails.fee) }
    const response = await axios.post(URL.paymentOrder, params, {
      headers: {
        Authorization: authStr,
      },
    })

    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_7aIsTw8qZyCQOy',
      name: 'VIRUJH',
      order_id: response.data.id,
      handler: async (response) => {
        try {
          const params = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
          updateRazerPay(METHOD.POST, URL.verification, params)
        } catch (err) {}
      },
      prefill: {
        name: patientDetails?.firstName + " " + patientDetails?.lastName,
        email: patientDetails?.email,
        contact: patientDetails?.phone,
      },
      theme: { color: '#0bb5ff' },
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  const handleDateChange = (event) => {
    setDate(event)
    setConfirmation(false)
    setTime({ start: '', end: '' })
  }

  function handleSubmit(confirmation) {
    if (time.start !== '' && time.end !== '') {
      const url = `${URL.appointmentPresentOnDate}?doctorKey=${doctorKey}&appointmentDate=${selectedDate}`
      updateOverBooking(METHOD.GET, url)
    } else {
      setError(true)
    }
  }

  const handleSlotTiming = (time) => {
    setTime({start: time.startTime, end: time.endTime})
    if (error) {
      setError(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    if (data?.appointment) {
      history.push('/patient/appointments/upcoming')
    }
  }

  const handleCloseConfirmation =() => {
    setOpenConfirmation(false)
  }

  return (
    <Box display="flex" className={classes.container}>
      <Box className={classes.datePicker}>
        {slots?.date && (
          <Box>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              disablePast
              disableToolbar
              orientation="landscape"
              variant="static"
              openTo="date"
              value={new Date(slots.date)}
              onChange={handleDateChange}
              className={classes.dateContainer}
            />
          </MuiPickersUtilsProvider>
                  
        <Box className={classes.button}>
          <Box className={classes.confirmButton} onClick={() => handleSubmit(false)}>
            <Typography className={classes.confirmText}>CONFIRM</Typography>
          </Box>
        </Box>
        </Box>
        )}
        {error && (
          <Typography className={classes.errorMessage}>
            Please select any free slot
          </Typography>
        )}
      </Box>
      {slots?.slots && (
        <AvailableSlots
          availableSlots={slots.slots}
          handleSlotTiming={handleSlotTiming}
          time={time}
          date={slots.date}
        />
      )}

      {overBookingResponse?.statusCode === 400 && (
        <OverBooking
          openDialog={openConfirmation}
          onclose={handleCloseConfirmation}
          onSubmit={onRazorpay}
          overBookingConfirmation={setOverBookingConfirmation}
        />
      )}
      {data && data?.appointment && (
        <SnackBar
          openDialog={open}
          message={'Appointment created Sucessfully'}
          onclose={handleClose}
          severity={'success'}
        />
      )}
      {(data && data.name === 'Error' && data.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (data && data.name === 'Error' && data.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
      {(data && data?.statusCode && data?.statusCode === 200 && (
        <SnackBar
          openDialog={open}
          message={data.message}
          onclose={handleClose}
          severity={'success'}
        />
      )) ||
        (data?.statusCode === 404 && (
          <SnackBar
            openDialog={open}
            message={data.message}
            onclose={handleClose}
            severity={'information'}
          />
        )) ||
        (data?.statusCode === 500 && (
          <SnackBar
            openDialog={open}
            message={'Internal Server Error'}
            onclose={handleClose}
            severity={'error'}
          />
        )) ||
        (data?.statusCode && data?.statusCode !== 400 && (
          <SnackBar
            openDialog={open}
            message={data.message}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
        {
          slots && slots.statusCode && slots.statusCode !== 200 && (
            <SnackBar
            openDialog={open}
            message={slots.message}
            onclose={handleClose}
            severity={'error'}
            />
          )
        }
    </Box>
  )
}

export default AppointmentDatePicker
