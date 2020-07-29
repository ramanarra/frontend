import React, { useState, useMemo } from 'react'
import moment from 'moment'
import {
  Typography,
  Box,
  TextField,
  DialogTitle,
  Dialog,
  DialogContent,
  FormControl,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import NativeSelect from '@material-ui/core/NativeSelect'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

import useStyle from './useCreateAppointmentStyle'
import { URL } from '../../../../../api'
import Textfield from '../../../../../components/Textfield'

function CreateAppointmentForExistingPatient({
  open,
  slot,
  patientData,
  onClose,
  timing,
  onSave,
  handleDetail,
}) {
  const classes = useStyle()

  const startTime = moment(slot.startTime, 'HH:mm:ss').format('HH:mm')

  const endTime = moment(slot.endTime, 'HH:mm:ss').format('HH:mm')

  const date = timing.split(' ')[0]

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')

  const [email, setEmail] = useState('')

  const appointmentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')

  const [phoneNumber, setPhoneNumber] = useState(patientData)

  const [payment, setPayment] = useState('directPayment')

  const [consultationMode, setConsultationMode] = useState('online')

  const [dateOfBirth, setDateOfBirth] = useState(null)

  const paymentOption = [
    { value: 'directPayment', label: 'Direct Payment' },
    { value: 'notRequired', label: 'Not Required' },
    { value: 'onlineCollection', label: 'Online Collection' },
  ]

  function handleClose() {
    onClose(false)
    handleDetail()
  }

  function handleOnSubmit() {
    onClose(false)
    handleDetail()
    const params = {
      patientId: patientData.id,
      startTime: startTime,
      endTime: endTime,
      appointmentDate: appointmentDate,
      paymentOption: payment,
      consultationMode: consultationMode,
    }
    onSave(URL.createAppointment, params)
  }

  const handleOnChange = (event) => {
    if (!isNaN(event.target.value)) {
      setPhoneNumber(event.target.value)
    }
  }

  const handlePaymentOption = (event) => {
    setPayment(event.target.value)
  }

  console.log(payment)

  const handleConsultationMode = (event) => {
    setConsultationMode(event.target.value)
  }

  const handlePreConsultation = (event) => {
    setPreConsultation(event.target.value)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleDateChange = (event) => {
    setDateOfBirth(event)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle className={classes.header}>
          <Box display="flex">
            <Typography className={classes.title}>Create Appointment</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.text}>
            <Typography className={classes.msg}>Existing Patient</Typography>
            <Typography className={classes.txt}>Your slot time {timing}</Typography>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.phoneText}>Phone Number</Typography>
            <TextField
              variant="outlined"
              className={classes.phone}
              placeholder="876548920"
              value={patientData.phone}
              onChange={handleOnChange}
            />
          </Box>
          <Box display="flex" className={classes.fieldBox}>
            <Box>
              <Typography className={classes.detailstext}>First Name</Typography>
              <TextField
                variant="outlined"
                className={classes.firstName}
                value={patientData.firstName}
                disabled
              />
            </Box>
            <Box className={classes.lastNameBox}>
              <Typography className={classes.detailstext}>Last Name</Typography>
              <TextField
                variant="outlined"
                className={classes.lastName}
                value={patientData.lastName}
                disabled
              />
            </Box>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext}>Email ID</Typography>
            <TextField
              variant="outlined"
              className={classes.email}
              placeholder="Johndoe@gmail.com"
              value={patientData.email}
              disabled
            />
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext}>Date of Birth</Typography>
            <TextField
              variant="outlined"
              value={patientData.dateOfBirth}
              placeholder={patientData.dateOfBirth}
              className={classes.date}
              disabled
            />
            <CalendarTodayIcon className={classes.calendarIcon} />
          </Box>
          <Box display="flex" className={classes.fieldBox}>
            <Box>
              <Typography className={classes.detailstext}>Payment Option</Typography>
              <FormControl variant="outlined">
                <NativeSelect
                  className={classes.payment}
                  defaultValue={payment}
                  onChange={handlePaymentOption}
                >
                  <option selected value="directPayment">
                    Direct Payment
                  </option>
                  <option value="notRequired">Not Required</option>
                  <option value="onlineCollection">Online Collection</option>
                </NativeSelect>
              </FormControl>
              {/* <Select options={paymentOption} className={classes.payment} onChange={handlePaymentOption} /> */}
            </Box>
            <Box className={classes.consultationModeBox}>
              <Typography className={classes.detailstext}>
                Consultation Mode
              </Typography>
              <FormControl variant="outlined">
                <NativeSelect
                  className={classes.consultationMode}
                  defaultValue={'select here...'}
                  onChange={handleConsultationMode}
                >
                  <option selected value="online">
                    Online
                  </option>
                  <option value="inHospital">InHospital</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext}>Pre-Consultation</Typography>
            {slot.preconsultationHours ? (
              <TextField
                className={classes.preConsultation}
                value="Yes"
                variant="outlined"
                disabled
              />
            ) : (
              <TextField
                className={classes.preConsultation}
                value="No"
                variant="outlined"
                disabled
              />
            )}
          </Box>
          <Box>
            <Box className={classes.submitbtn} onClick={handleOnSubmit}>
              <Typography className={classes.submitText}>
                BOOK APPOINTMENT
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CreateAppointmentForExistingPatient
