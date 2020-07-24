import React, {useState} from 'react'
import { Typography, Box, TextField, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import CreateAppointment from './CreateAppointmentDialog'
import useStyle from './useStyle'


function FreeSlotModal({ open, onClose, slot, timing }) {
  const classes = useStyle()

  const [phoneNumber, setPhoneNumber] = useState(null)

  const [openNew, setOpenNew] = useState(false)

  const [relatedField, setRelatedField] = useState(null)

  function handleOnClick(event) {
    onClose(event)
    setOpenNew(true)
  }

  function handleOnClose() {
    setOpenNew(false)
  }

  function handleClose(event) {
    onClose(event)
  }

  const handleOnchange = (event) => {
    if (!isNaN(event.target.value)) {
      setPhoneNumber(event.target.value)
    }
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
            <Typography className={classes.txt}>Your slot time {timing}</Typography>
          </Box>
          <Box style={{ paddingTop: '13px' }}>
            <Typography className={classes.phoneText}>Phone Number</Typography>
            <TextField
              variant="outlined"
              className={classes.phone}
              placeholder="876548920"
              value={phoneNumber}
              onChange={handleOnchange}
            />
            <Box>
              <Typography>{relatedField}</Typography>
            </Box>
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
      <CreateAppointment
        open={openNew}
        details={slot}
        onClose={handleOnClose}
        timing={timing}
      />
    </Box>
  )
}

export default FreeSlotModal
