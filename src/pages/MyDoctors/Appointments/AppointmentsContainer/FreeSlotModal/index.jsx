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

import CreateAppointment from './CreateAppointmentDialog'
import useStyle from './useStyle'
import { METHOD, URL } from '../../../../../api'
import useManualFetch from '../../../../../hooks/useManualFetch'

function FreeSlotModal({ slot, open, onClose, onSave, slotTime }) {
  const classes = useStyle()

  const [phoneNumber, setPhoneNumber] = useState('')

  const [openNew, setOpenNew] = useState(false)

  const [openOption, setOpenOption] = useState(false)

  const [updateData, updateError, isUpdating, data] = useManualFetch()

  const [detail, setDetail] = useState(null)

  function handleOnClick(event) {
    onClose(event)
    setOpenNew(true)
    setPhoneNumber('')
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
          style={{ paddingTop: '35px', paddingRight: '10px', paddingBottom: '3px' }}
        >
          <Box display="flex">
            <Typography className={classes.title}>Create Appointment</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent style={{ paddingTop: '0px' }}>
          <Box className={classes.text}>
            <Typography className={classes.msg}>Choose Patient</Typography>
            <Typography className={classes.txt}>
              Your slot time {slotTime}
            </Typography>
          </Box>
          <Box style={{ paddingTop: '13px' }}>
            <Typography className={classes.phoneText}>Phone Number</Typography>
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
                      <Typography className={classes.phoneNumber}>
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
        <CreateAppointment
          open={openNew}
          details={slot}
          patientData={detail}
          onClose={handleOnClose}
          timing={slotTime}
          onSave={onSave}
        />
      )}
      {!detail && openNew && (
        <CreateAppointment
          open={openNew}
          details={slot}
          patientData={phoneNumber}
          onClose={handleOnClose}
          timing={slotTime}
          onSave={onSave}
        />
      )}
    </Box>
  )
}

export default FreeSlotModal
