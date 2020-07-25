import React from 'react'
import { Typography, Box, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import { URL } from '../../../../../api'
import useStyle from './useCancleAppointmentStyle'



function CancleAppointment({open, slotTime, onClose, id, onSave}) {

    const classes = useStyle()

    const slotDate = slotTime.split(' ')

    const appointmentId = {
        appointmentId: id
      }

    function handleClose(event) {
        onClose(event)
    }

    function handleConfimation(event) {
        onClose(event)
        onSave(URL.appointmentCancel, appointmentId)
    }
    
    function handleConfirmationCancle(event) {
        onClose(event)
    }

    return(
        <Box>
            <Dialog open={open} className={classes.cancellation}>
                <DialogTitle>
                <Box display="flex">
                    <Typography className={classes.confirmation}>Confirmation</Typography>
                    <CloseIcon className={classes.closed} onClick={handleClose} />
                </Box>
                </DialogTitle>
                <DialogContent>
                <Box className={classes.askConfirmation}>
                    <Typography className={classes.askConfirmationText}>
                    Are you sure want to cancle your appointment {slotDate[1] + ' ' + slotDate[0]}
                    </Typography>
                </Box>
                <Box display="flex" className={classes.notes}>
                    <StarIcon className={classes.confirmationStar} />
                    <Typography className={classes.confirmationNote}>
                    The appointment has been cancelled as no money transaction here
                    </Typography>
                </Box>
                </DialogContent>
                <Box display="flex">
                <Box className={classes.cancleButton} onClick={handleConfirmationCancle}>
                    <Typography className={classes.cancleText}>NO</Typography>
                </Box>
                <Box className={classes.confirmButton} onClick={handleConfimation}>
                    <Typography className={classes.confirmText}>YES</Typography>
                </Box>
                </Box>
            </Dialog>
        </Box>
    )
}

export default CancleAppointment;