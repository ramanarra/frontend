import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function SnackBar({ openDialog, message, onclose, severity }) {
  const handleClose = () => {
    onclose()
  }

  return (
    <Snackbar open={openDialog} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}

export default SnackBar
