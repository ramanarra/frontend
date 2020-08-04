import React, { useState } from 'react'
import moment from 'moment'
import {
  Typography,
  Box,
  TextField,
  DialogTitle,
  Dialog,
  DialogContent,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import useStyle from './useCreateAppointmentStyle'
import DatePicker from '../../../../../components/DatePicker'
import Select from '../../../../../components/Select'
import { URL } from '../../../../../api'
import Textfield from '../../../../../components/Textfield'

const paymentOption = [
  { value: 'directPayment', label: 'Direct Payment' },
  { value: 'notRequired', label: 'Not Required' },
  { value: 'onlineCollection', label: 'Online Collection' },
]

const consultationModeOption = [
  { value: 'online', label: 'Online' },
  { value: 'inHospital', label: 'In Hospital' },
]

function CreateAppointmentForNewPatient({
  open,
  slot,
  patientData,
  onClose,
  slotTime,
  onSave,
  handleClear,
  doctorKey,
}) {
  const classes = useStyle()

  const startTime = moment(slot.startTime, 'HH:mm:ss').format('HH:mm')

  const endTime = moment(slot.endTime, 'HH:mm:ss').format('HH:mm')

  const date = slotTime.split(' ')[0]

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')

  const [email, setEmail] = useState('')

  const appointmentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')

  const [payment, setPayment] = useState('directPayment')

  const [consultationMode, setConsultationMode] = useState('online')

  const [dateOfBirth, setDateOfBirth] = useState(null)

  function handleClose() {
    onClose(false)
    handleClear()
  }

  function handleOnSubmit() {
    onClose(false)
    const params = {
      phone: patientData,
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dateOfBirth,
      appointmentDate: appointmentDate,
      startTime: startTime,
      endTime: endTime,
      paymentOption: payment,
      consultationMode: consultationMode,
      doctorKey: doctorKey,
    }
    onSave(URL.createAppointmentAlongWIthRegisteringPatient, params)
    handleClear()
  }

  const handlePaymentOption = (event) => {
    setPayment(event.target.value)
  }

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
            <Typography className={classes.msg}>Create a New Patient</Typography>
            <Typography className={classes.txt}>
              {`Your slot time ${slotTime}`}
            </Typography>
          </Box>
          <Box className={classes.newFieldBox}>
            <Typography className={classes.phoneNumberText}>Phone Number</Typography>
            <TextField
              variant="outlined"
              className={classes.newPatientPhone}
              placeholder="876548920"
              value={patientData}
              disabled
            />
          </Box>
          <Box display="flex" className={classes.newFieldBox}>
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
          <Box className={classes.newFieldBox}>
            <Textfield
              name="email"
              label="Email ID"
              placeholder="arul@gmail.com"
              type="email"
              className={classes.newPatientEmail}
              onChange={handleEmailChange}
            />
          </Box>
          <Box className={classes.newPatientDate}>
            <DatePicker
              name={'Date of Birth'}
              dateChange={handleDateChange}
              value={dateOfBirth}
              width={435}
              fontSize={13.7}
              disablePast={false}
            />
          </Box>
          <Box display="flex" className={classes.newFieldBox}>
            <Box className={classes.newPatientpayment}>
              <Typography className={classes.optionHeader}>
                Payment Option
              </Typography>
              <Box className={classes.newPatientPaymentOptionBox}>
                <Select
                  value={payment}
                  options={paymentOption}
                  onChange={handlePaymentOption}
                />
              </Box>
            </Box>
            <Box className={classes.newPatientconsultationModeBox}>
              <Typography className={classes.optionHeader} variant="h5">
                Consultation Mode
              </Typography>
              <Box className={classes.newPatientConsultationMode}>
                <Select
                  value={consultationMode}
                  options={consultationModeOption}
                  onChange={handleConsultationMode}
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.newPatientPreConsultation}>
            <Typography className={classes.optionHeader}>
              Pre-Consultation
            </Typography>
            <TextField
              className={classes.newPatientPreConsultationBox}
              value={slot.preconsultationHours ? 'Yes' : 'No'}
              variant="outlined"
              disabled
            />
          </Box>
          <Box className={classes.createButton}>
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
