import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  makeStyles,
} from '@material-ui/core'

const useStyle = makeStyles(() => ({
  infoHeader: {
    fontSize: 20,
    color: '#001fff',
  },
  errorHeader: {
    fontSize: 20,
    color: '#fd041b',
  },
  message: {
    paddingTop: 10,
    marginRight: 40,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: '1%',
    color: '#0fffff',
    marginRight: -10,
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function SnackBar({ openDialog, message, onclose, severity }) {
  const classes = useStyle()

  const handleClose = () => {
    onclose()
  }

  return (
    <Box>
      {severity === 'success' ? (
        <Snackbar open={openDialog} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      ) : (
        <Dialog open={openDialog}>
          <DialogContent>
            <Typography
              className={
                severity === 'info' ? classes.infoHeader : classes.errorHeader
              }
            >
              {severity === 'info' ? 'Info' : 'Error'}
            </Typography>
            <Typography className={classes.message}>{message}</Typography>
            <Box className={classes.buttonContainer}>
              <Button onClick={handleClose} className={classes.button}>
                OK
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  )
}

export default SnackBar
