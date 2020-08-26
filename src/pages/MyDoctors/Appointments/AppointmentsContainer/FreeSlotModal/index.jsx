import React, { useState } from 'react'
import {
  Typography,
  Box,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import CreateAppointmentForExistingPatient from './CreateAppointmentForExistingPatient'
import CreateAppointmentForNewPatient from './CreateAppointmentForNewPatient'
import useStyle from './useStyle'
import { METHOD, URL } from '../../../../../api'
import useManualFetch from '../../../../../hooks/useManualFetch'

function FreeSlotModal({ slot, open, onClose, onSave, slotTime, doctorKey }) {
  const classes = useStyle()

  const [phoneNumber, setPhoneNumber] = useState('')

  const [openNew, setOpenNew] = useState(false)

  const [openOption, setOpenOption] = useState(false)

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  const [detail, setDetail] = useState(null)

  function handleOnClick(event) {
    if(phoneNumber !== '' && String(phoneNumber).length === 10) {
      onClose(event)
      setOpenNew(true)
    }
    if(detail) {
      if(detail.phone !== phoneNumber) {
        setDetail(null)
      }
    }
  }

  function handleClear() {
    setPhoneNumber('')
  }

  function handleDetail() {
    setDetail(null)
  }

  function handleOnClose() {
    setOpenNew(false)
  }

  function handleClose(event) {
    onClose(event)
  }

  function handleOnchange(event) {
    if (!isNaN(event.target.value)) {
      setPhoneNumber(event.target.value)
      if (event.target.value !== '') {
        updateData(METHOD.POST, URL.patientSearch, {
          phone: String(event.target.value),
        })
      }
    }
    if (!openOption) {
      setOpenOption(true)
    }
  }

  const handleOnOptionChange = (option) => {
    setPhoneNumber(option.phone)
    setDetail(option)
    setOpenOption(false)
  }


  return (
    <Box>
      <Dialog open={open} className={classes.dialogBox}>
        <DialogTitle
          className={classes.dialogTitle}
        >
          <Box display="flex">
            <Typography variant="h5" className={classes.title}>Create Appointment</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Box className={classes.text}>
            <Typography variant="h5" className={classes.msg}>Choose Patient</Typography>
            <Typography variant="h5" className={classes.txt}>
              Your slot time {slotTime}
            </Typography>
          </Box>
          <Box className={classes.content}>
            <Typography variant="h5" className={classes.phoneText}>Phone Number</Typography>
            <TextField
              className={classes.phone}
              onChange={handleOnchange}
              value={phoneNumber}
              variant="outlined"
            />
            {openOption && data && (
              <Box className={classes.dropDown}>
                {data.map((option, key) => {
                  return (
                    <Box
                      key={key}
                      className={classes.option}
                      onClick={() => handleOnOptionChange(option)}
                    >
                      <Typography variant="h5" className={classes.phoneNumber}>
                        {option.phone}
                      </Typography>
                      <Typography className={classes.detail}>
                        {option.firstName +
                          ' ' +
                          option.lastName +
                          ',' +
                          ' ' +
                          option.email +
                          ',' +
                          ' ' +
                          option.dateOfBirth +
                          '...'}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
            )}
          </Box>
          <Box>
            <Box display="flex" className={classes.noteOne}>
              <StarIcon className={classes.star} />
              <Typography className={classes.noteText}>
                If new patient enter the phone number and click next
              </Typography>
            </Box>
            <Box display="flex" className={classes.noteTwo}>
              <StarIcon className={classes.star} />
              <Typography className={classes.noteText}>
                Search for existing patient{' '}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box className={classes.nextBtn} onClick={handleOnClick}>
              <Typography className={classes.nextText}>NEXT</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {detail && openNew && (
        <CreateAppointmentForExistingPatient
          doctorKey={doctorKey}
          open={openNew}
          slot={slot}
          patientData={detail}
          onClose={handleOnClose}
          slotTime={slotTime}
          onSave={onSave}
          handleDetail={handleDetail}
          handleClear={handleClear}
        />
      ) }
      {!detail && openNew && phoneNumber !== '' && (
        <CreateAppointmentForNewPatient
          doctorKey={doctorKey}
          open={openNew}
          slot={slot}
          patientData={phoneNumber}
          onClose={handleOnClose}
          slotTime={slotTime}
          onSave={onSave}
          handleClear={handleClear}
        />
      )}
    </Box>
  )
}

export default FreeSlotModal
