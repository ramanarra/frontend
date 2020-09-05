import React from 'react'
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core'

const useStyle = makeStyles(() => ({
    content: {
        width: 450,
    },
    text: {
        fontSize: 20,
    },
    button: {
        marginLeft: 325,
    },
    buttonText: {
        color: '#1b7ce1',
    }
}))

function NonAvailabilityModal({open, onClose, name}) {
  const classes = useStyle()

  function handleOnClick() {
    onClose(false)
  }

  return (
    <Box>
      <Dialog open={open}>
        <DialogContent className={classes.content}>
          <Typography className={classes.text}>{name} Not Found</Typography>
          <Button onClick={handleOnClick} className={classes.button}>
            <Typography className={classes.buttonText}>DISMISS</Typography>
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default NonAvailabilityModal
