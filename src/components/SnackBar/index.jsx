import React from "react"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function SnackBar({open, message, onclose}) {

    const handleClose = () => {
        onclose()
      }

    return(
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success">
            {message}
          </Alert>
        </Snackbar>
    )
}

export default SnackBar