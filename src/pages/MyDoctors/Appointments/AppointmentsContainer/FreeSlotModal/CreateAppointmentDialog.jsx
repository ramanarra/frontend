import React, { useState, useMemo } from 'react'
import moment from 'moment'
import Select from 'react-select'
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

function CreateAppointment({ open, details, patientData, onClose, timing, onSave }) {
  const classes = useStyle()

  const startTime = moment(details.startTime, 'HH:mm:ss').format('HH:mm')

  const endTime = moment(details.endTime, 'HH:mm:ss').format('HH:mm')

  const date = timing.split(' ')[0]

  const [firstName, setFirstName] = useState('')

  const [lastName, setLastName] = useState('')

  const [email, setEmail] = useState('')

  const appointmentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')

  const [phoneNumber, setPhoneNumber] = useState(patientData)

  const [payment, setPayment] = useState('directPayment')

  const [preConsultation, setPreConsultation] = useState('Yes')

  const [consultationMode, setConsultationMode] = useState('online')

  const [dateOfBirth, setDateOfBirth] = useState(null)

  const paymentOption = [{ value: "directPayment", label: "Direct Payment" },
                          { value: "notRequired", label: "Not Required" },
                          { value: "onlineCollection", label: "Online Collection" }]

  const params = useMemo(() => {
    if(patientData.id) {
      return {
        patientId: patientData.id,
        startTime: startTime,
        endTime: endTime,
        appointmentDate: appointmentDate,
        paymentOption: payment,
        consultationMode: consultationMode,
      }
    }
    else {
      return {
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
    }
  }, [phoneNumber, firstName, lastName, email, dateOfBirth, appointmentDate, payment, consultationMode])

  function handleClose() {
    onClose(false)
  }

  function handleOnSubmit() {
    onClose(false)
    if(patientData !== 'null') {
      onSave(URL.createAppointment, params)
    }
    else {
      onSave(URL.createAppointmentAlongWIthRegisteringPatient, params)
    }
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
      {!patientData.id ? (
        <Dialog open={open}>
        <DialogTitle
          style={{
            paddingTop: '35px',
            paddingRight: '10px',
            paddingBottom: '3px',
          }}
        >
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
          <Box style={{ paddingTop: '13px' }}>
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
          <Box display="flex" style={{ paddingTop: '15px' }}>
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
          <Box style={{ paddingTop: '15px' }}>
          <Textfield
            name="email"
            label="Email ID"
            placeholder="arul@gmail.com"
            type="email"
            className={classes.newPatientEmail}
            onChange={handleEmailChange}
            />
          </Box>
          <Box style={{ paddingTop: '15px' }}>
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
          <Box display="flex" style={{ paddingTop: '15px' }}>
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
          <Box style={{ paddingTop: '15px' }}>
            <Typography className={classes.detailstext}>
              Pre-Consultation
            </Typography>
            {
              details.preconsultationHours ? 
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
        
      ) : (
        
        <Dialog open={open}>
        <DialogTitle
          style={{
            paddingTop: '35px',
            paddingRight: '10px',
            paddingBottom: '3px',
          }}
        >
          <Box display="flex">
            <Typography className={classes.title}>Create Appointment</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.text}>
            <Typography className={classes.msg}>Existing Patient</Typography>
            <Typography className={classes.txt}>
              Your slot time {timing}
            </Typography>
          </Box>
          <Box style={{ paddingTop: '13px' }}>
            <Typography className={classes.phoneText}>Phone Number</Typography>
            <TextField
              variant="outlined"
              className={classes.phone}
              placeholder="876548920"
              value={patientData.phone}
              onChange={handleOnChange}
            />
          </Box>
          <Box display="flex" style={{ paddingTop: '15px' }}>
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
          <Box style={{ paddingTop: '15px' }}>
            <Typography className={classes.detailstext}>Email ID</Typography>
            <TextField
              variant="outlined"
              className={classes.email}
              placeholder="Johndoe@gmail.com"
              value={patientData.email}
              disabled
            />
          </Box>
          <Box style={{ paddingTop: '15px' }}>
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
          <Box display="flex" style={{ paddingTop: '15px' }}>
            <Box>
              <Typography className={classes.detailstext}>
                Payment Option
              </Typography>
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
                  <option selected value="online">Online</option>
                  <option value='inHospital'>InHospital</option>
                </NativeSelect>
              </FormControl>
              
            </Box>
          </Box>
          <Box style={{ paddingTop: '15px' }}>
            <Typography className={classes.detailstext}>
              Pre-Consultation
            </Typography>
            {
              details.preconsultationHours ? 
              <TextField className={classes.preConsultation} value='Yes' variant='outlined' disabled /> :
              <TextField className={classes.preConsultation} value='No' variant='outlined' disabled />
            }
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
      )}
    </Box>
  )
}

export default CreateAppointment
