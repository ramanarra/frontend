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
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import useStyle from './useCreateAppointmentStyle'
import { URL } from '../../../../../api'
import Textfield from '../../../../../components/Textfield'

function CreateAppointmentForNewPatient({ open, slot, patientData, onClose, timing, onSave }) {
  const classes = useStyle()

  const startTime = moment(slot.startTime, 'HH:mm:ss').format('HH:mm')

  const endTime = moment(slot.endTime, 'HH:mm:ss').format('HH:mm')

  const date = timing.split(' ')[0]

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')

  const [email, setEmail] = useState('')

  const appointmentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')

  const [phoneNumber, setPhoneNumber] = useState(String(patientData))

  const [payment, setPayment] = useState('directPayment')

  const [consultationMode, setConsultationMode] = useState('online')

  const [dateOfBirth, setDateOfBirth] = useState(null)

  const paymentOption = [{ value: "directPayment", label: "Direct Payment" },
                          { value: "notRequired", label: "Not Required" },
                          { value: "onlineCollection", label: "Online Collection" }]


  function handleClose() {
    onClose(false)
  }

  function handleOnSubmit() {
    onClose(false)
    const params = {
        phone: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateOfBirth: dateOfBirth,
        appointmentDate: appointmentDate,
        startTime: startTime,
        endTime: endTime,
        paymentOption: payment,
        consultationMode: consultationMode,
    }
    onSave(URL.createAppointmentAlongWIthRegisteringPatient, params)
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
            <Typography className={classes.msg}>Choose Patient</Typography>
            <Typography className={classes.txt}>
              Your slot time {timing}
            </Typography>
          </Box>
          <Box className={classes.fieldBox}>
            <Textfield
            name="Phone"
            label="Phone Number"
            placeholder="8745142572"
            type="number"
            value={patientData}
            className={classes.newPatientPhone}
            onChange={handleOnChange}
            disabled
            />
          </Box>
          <Box display="flex" className={classes.fieldBox}>
            <Box>
            <Textfield
            name="First Name"
            label="First Name"
            placeholder="Arul"
            type="text"
            className={classes.newPatientFirstName}
            onChange={handleFirstNameChange}
            />
            </Box>
            <Box className={classes.newPatientLastNameBox}>
            <Textfield
            name="Last Name"
            label="Last Name"
            placeholder="Prakash"
            type="text"
            className={classes.newPatientLastName}
            onChange={handleLastNameChange}
            />
            </Box>
          </Box>
          <Box className={classes.fieldBox}>
          <Textfield
            name="email"
            label="Email ID"
            placeholder="arul@gmail.com"
            type="email"
            className={classes.newPatientEmail}
            onChange={handleEmailChange}
            />
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext}>Date of Birth</Typography>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              className={classes.datePicker}
            >
              <KeyboardDatePicker
                disableToolbar
                className={classes.newPatientDate}
                variant="outlined"
                format="MM/dd/yyyy"
                placeholder='05/05/2020'
                margin="normal"
                id="date-picker-inline"
                value={dateOfBirth}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box display="flex" className={classes.fieldBox}>
            <Box>
              <Typography className={classes.detailstext}>
                Payment Option
              </Typography>
              <FormControl variant="outlined">
                <NativeSelect className={classes.payment} defaultValue={payment}>
                  <option selected value='directPayment'>
                    Direct Payment
                  </option>
                  <option value='notRequired'>Not Required</option>
                  <option value='onlineCollection'>Online Collection</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <Box className={classes.consultationModeBox}>
              <Typography className={classes.detailstext}>
                Consultation Mode
              </Typography>
              <FormControl variant="outlined">
                <NativeSelect
                  className={classes.consultationMode}
                  defaultValue={'select here...'}
                >
                  <option selected value='online'>
                    Online
                  </option>
                  <option value='inHospital'>In Hospital</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext}>
              Pre-Consultation
            </Typography>
            {
              slot.preconsultationHours ? 
              <TextField className={classes.preConsultation} value='Yes' variant='outlined' disabled /> :
              <TextField className={classes.preConsultation} value='No' variant='outlined' disabled />
            }
          </Box>
          <Box>
            <Box className={classes.submitbtn} onClick={handleOnSubmit}>
              <Typography className={classes.submitText}>
                CREATE PATIENT AND BOOK APPOINTMENT
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default CreateAppointmentForNewPatient
