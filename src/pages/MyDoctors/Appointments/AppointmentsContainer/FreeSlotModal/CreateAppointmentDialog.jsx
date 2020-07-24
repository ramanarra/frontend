import React, { useState } from 'react'
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

import useStyle from './useStyleForCreateAppointment'

function CreateAppointment({ open, details, onClose, timing }) {
  const classes = useStyle()

  const [phoneNumber, setPhoneNumber] = useState(null)

  const [payment, setPayment] = useState('select here...')

  const [date, setDate] = useState('12/05/2020')

  function handleClose() {
    onClose(false)
  }

  function handleOnSubmit() {
    onClose(false)
  }

  const handleOnChange = (event) => {
    if (!isNaN(event.target.value)) {
      setPhoneNumber(event.target.value)
    }
  }

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{ paddingTop: '35px', paddingRight: '10px', paddingBottom: '3px' }}
      >
        <Box display="flex">
          <Typography className={classes.title}>Create Appointment</Typography>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.text}>
          <Typography className={classes.msg}>Choose Patient</Typography>
          <Typography className={classes.txt}>Your slot time {timing}</Typography>
        </Box>
        <Box style={{ paddingTop: '13px' }}>
          <Typography className={classes.phoneText}>Phone Number</Typography>
          <TextField
            variant="outlined"
            className={classes.phone}
            placeholder="876548920"
            value={phoneNumber}
            onChange={handleOnChange}
          />
        </Box>
        <Box display="flex" style={{ paddingTop: '15px' }}>
          <Box>
            <Typography className={classes.detailstext}>First Name</Typography>
            <TextField variant="outlined" className={classes.firstName} />
          </Box>
          <Box className={classes.lastNameBox}>
            <Typography className={classes.detailstext}>Last Name</Typography>
            <TextField variant="outlined" className={classes.lastName} />
          </Box>
        </Box>
        <Box style={{ paddingTop: '15px' }}>
          <Typography className={classes.detailstext}>Email ID</Typography>
          <TextField
            variant="outlined"
            className={classes.email}
            placeholder="Johndoe@gmail.com"
          />
        </Box>
        <Box style={{ paddingTop: '15px' }}>
          <Typography className={classes.detailstext}>Date of Birth</Typography>
          <TextField
            variant="outlined"
            placeholder={date}
            type="date"
            className={classes.date}
          />
        </Box>
        <Box display="flex" style={{ paddingTop: '15px' }}>
          <Box>
            <Typography className={classes.detailstext}>Payment Option</Typography>
            <FormControl variant="outlined">
              <NativeSelect className={classes.payment} defaultValue={payment}>
                <option disabled selected>
                  select your option...
                </option>
                <option>Select your Option</option>
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
                <option></option>
                <option>Select your Option</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
        <Box style={{ paddingTop: '15px' }}>
          <Typography className={classes.detailstext}>Pre-Consultation</Typography>
          <FormControl variant="outlined" value="Select your option">
            <NativeSelect
              className={classes.preConsultation}
              variant="outlined"
              defaultValue="select here..."
            >
              <option></option>
              <option>Select your Option</option>
            </NativeSelect>
          </FormControl>
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
  )
}

export default CreateAppointment
