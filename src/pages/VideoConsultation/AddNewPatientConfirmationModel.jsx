import React from 'react'
import { Box, Dialog, DialogContent, Typography, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyle = makeStyles(() => ({
    icon: {
        textAlign: 'end',
        paddingTop: 20,
      },
      closeIcon: {
        cursor: 'pointer',
        marginRight: -12,
        color: '#a8a8a8',
      },
      text: {
          fontSize: 19,
          paddingTop: 15,
          color: '#4f4f4f',
      },
      buttons: {
          paddingTop: 40,
          paddingBottom: 20,
          justifyContent: 'center',
      },
      cancelButton: {
          padding: '8.5px 26px',
          borderRadius: 20,
          backgroundColor: '#e1e0e0',
          marginRight: 15,
          cursor: 'pointer',
      },
      cancelText: {
          fontSize: 12,
          color: '#a8a8a8',
      },
      confirmButton: {
          padding: '8.5px 38px',
          borderRadius: 20,
          backgroundColor: '#0eabff',
          cursor: 'pointer',
      },
      confirmText: {
          fontSize: 12,
          color: '#f7f7f7'
      }
}))

function AddNewPatientConfirmationModel({open, onClose, NextPatient}) {

    const classes = useStyle()

    function handleClose() {
        onClose()
    }

    function handleSUbmit() {
        NextPatient()
        onClose()
    }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent>
          <Box className={classes.icon}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Box>
          <Box>
              <Typography className={classes.text} variant="h5">
                  Finish consultation and join the next patient consultation.
              </Typography>
              <Box className={classes.buttons} display="flex">
                  <Box className={classes.cancelButton} onClick={handleClose}>
                    <Typography className={classes.cancelText}>CANCEL</Typography>
                  </Box>
                  <Box className={classes.confirmButton} onClick={handleSUbmit}>
                      <Typography className={classes.confirmText}>YES</Typography>
                  </Box>
              </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default AddNewPatientConfirmationModel
