import React from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import CloseIcon from '@material-ui/icons/Close'

const useStyle = makeStyles(() => ({
  titleText: {
    color: '#575555',
    fontSize: 22,
  },

  content: {
    width: 450,
  },

  closeIcon: {
      width: 25,
      marginLeft: 250,
      marginTop: 5,
      cursor: 'pointer',
  },

  confimationText: {
    color: '#898989',
    fontSize: 18,
  },

  note: {
    paddingTop: 13,
  },

  noteHeader: {
    color: '#e41919',
  },

  confirmationStar: {
    width: 7,
    color: 'red',
    marginTop: -5,
  },

  noteText: {
    paddingLeft: 2,
    color: '#545151',
  },

  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: 25,
    paddingBottom: 20,
  },

  cancelBtn: {
    backgroundColor: '#f4f2f2',
    borderRadius: 27,
    padding: '8px 30px',
    cursor: 'pointer',
  },

  submitBtn: {
    backgroundColor: '#0bb5ff',
    borderRadius: 27,
    padding: '8px 30px',
    marginLeft: 15,
    cursor: 'pointer',
  },

  cancleText: {
    color: '#a8a8a8',
  },

  submitText: {
    color: '#f7f7f7',
  },
}))

function ConfirmationDialog({ open, onClose, handleChange, value }) {
  const classes = useStyle()

  function handleClose(event) {
    onClose(event)
  }

  function handleOnClick(event) {
    onClose(event)
    handleChange(value)
  }
  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>
          <Box display="flex">
            <Typography className={classes.titleText} variant="h5">Confirmation</Typography>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Box>
            <Typography className={classes.confimationText}>
              Are you sure want to change your consultation session timing?
            </Typography>
          </Box>
          <Box display="flex" className={classes.note}>
            <StarIcon className={classes.confirmationStar} />
            <Typography className={classes.noteText}>
              This session time change may affect the slot timings
            </Typography>
          </Box>
          <Box className={classes.button}>
            <Box onClick={handleClose} className={classes.cancelBtn}>
              <Typography className={classes.cancleText}>NO</Typography>
            </Box>
            <Box onClick={handleOnClick} className={classes.submitBtn}>
              <Typography className={classes.submitText}>YES</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ConfirmationDialog
