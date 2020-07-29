import React, { useState } from 'react'
import moment from 'moment'
import { GoCalendar } from 'react-icons/go'
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
import Select from '../../../../../components/Select'
import { URL } from '../../../../../api'

const paymentOption = [
  { value: 'directPayment', label: 'Direct Payment' },
  { value: 'notRequired', label: 'Not Required' },
  { value: 'onlineCollection', label: 'Online Collection' },
]

const consultationModeOption = [
  { value: 'online', label: 'Online' },
  { value: 'inHospital', label: 'In Hospital' },
]

function CreateAppointmentForExistingPatient({
  open,
  slot,
  patientData,
  onClose,
  slotTime,
  onSave,
  handleDetail,
  handleClear,
}) {
  const classes = useStyle()

  const startTime = moment(slot.startTime, 'HH:mm:ss').format('HH:mm')

  const endTime = moment(slot.endTime, 'HH:mm:ss').format('HH:mm')

  const date = slotTime.split(' ')[0]

  const appointmentDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')

  const [payment, setPayment] = useState('directPayment')

  const [consultationMode, setConsultationMode] = useState('online')

  function handleClose() {
    onClose(false)
    handleDetail()
    handleClear()
  }

  function handleOnSubmit() {
    onClose(false)
    const params = {
      patientId: patientData.id,
      startTime: startTime,
      endTime: endTime,
      appointmentDate: appointmentDate,
      paymentOption: payment,
      consultationMode: consultationMode,
    }
    onSave(URL.createAppointment, params)
    handleDetail()
    handleClear()
  }

  const handlePaymentOption = (event) => {
    setPayment(event.target.value)
  }

  const handleConsultationMode = (event) => {
    setConsultationMode(event.target.value)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle className={classes.header}>
          <Box display="flex">
            <Typography className={classes.title} variant="h5">
              Create Appointment
            </Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box className={classes.text}>
            <Typography className={classes.msg} variant="h5">
              Existing Patient
            </Typography>
            <Typography
              className={classes.txt}
              variant="h5"
            >{`Your slot time ${slotTime}`}</Typography>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.phoneText} variant="h5">
              Phone Number
            </Typography>
            <TextField
              variant="outlined"
              className={classes.phone}
              placeholder="876548920"
              value={patientData.phone}
              disabled
            />
          </Box>
          <Box display="flex" className={classes.fieldBox}>
            <Box>
              <Typography className={classes.detailstext} variant="h5">
                First Name
              </Typography>
              <TextField
                variant="outlined"
                className={classes.firstName}
                value={patientData.firstName}
                disabled
              />
            </Box>
            <Box className={classes.lastNameBox}>
              <Typography className={classes.detailstext} variant="h5">
                Last Name
              </Typography>
              <TextField
                variant="outlined"
                className={classes.lastName}
                value={patientData.lastName}
                disabled
              />
            </Box>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext} variant="h5">
              Email ID
            </Typography>
            <TextField
              variant="outlined"
              className={classes.email}
              placeholder="Johndoe@gmail.com"
              value={patientData.email}
              disabled
            />
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext} variant="h5">
              Date of Birth
            </Typography>
            <TextField
              variant="outlined"
              value={patientData.dateOfBirth}
              placeholder={patientData.dateOfBirth}
              className={classes.date}
              disabled
            />
            <GoCalendar className={classes.calendarIcon} />
          </Box>
          <Box display="flex" className={classes.fieldBox}>
            <Box className={classes.payment}>
              <Typography className={classes.detailstext}>Payment Option</Typography>
              <Box className={classes.paymentOptionBox}>
              <Select
                value={payment}
                options={paymentOption}
                onChange={handlePaymentOption}
              />
              </Box>
            </Box>
            <Box className={classes.consultationModeBox}>
              <Typography className={classes.detailstext} variant="h5">
                Consultation Mode
              </Typography>
              <Box className={classes.consultationMode}>
              <Select
                value={consultationMode}
                options={consultationModeOption}
                onChange={handleConsultationMode}
              />
              </Box>
            </Box>
          </Box>
          <Box className={classes.fieldBox}>
            <Typography className={classes.detailstext} variant="h5">
              Pre-Consultation
            </Typography>
            <TextField
              className={classes.preConsultation}
              value={slot.preconsultationHours ? 'Yes' : 'No'}
              variant="outlined"
              disabled
            />
          </Box>
          <Box className={classes.button}>
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
