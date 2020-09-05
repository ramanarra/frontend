import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import classNames from 'classnames'
import CloseIcon from '@material-ui/icons/Close'
import StarIcon from '@material-ui/icons/Star'

import { METHOD, URL } from '../../../../../api'
import useManualFetch from '../../../../../hooks/useManualFetch'
import CancleAppointment from './CancleAppointmentDialog'
import RescheduleAppointment from './RescheduleAppointmentDialog'
import useStyle from './useStyle'
import ConfirmationModal from './ConfirmationModal'

function CancleAndRescheduleModal({
  appointmentId,
  patientId,
  open,
  onClose,
  slotTime,
  onSave,
  bookedBy,
  note,
  doubleStar,
  singleStar,
  cancellationNote,
}) {
  const classes = useStyle()

  const [fetch, error, isLoading, patientView] = useManualFetch()

  const [openCanclationDialog, setCanclationDialog] = useState(false)

  const [openReschedule, setOpenReschedule] = useState(false)

  const [openConfirmation, setOpenConfirmation] = useState(false)

  const [parameter, setParameter] = useState(null)

  useEffect(() => {
    if (open) {
      const params = {
        appointmentId: appointmentId,
      }
      fetch(METHOD.POST, URL.appointmentView, params)
    }
  }, [open, appointmentId])

  const phone = patientView?.patientDetails?.phone
    ? patientView.patientDetails.phone
    : '-'

  const firstName = patientView?.patientDetails?.firstName
    ? patientView.patientDetails.firstName
    : '-'

  const lastName = patientView?.patientDetails?.lastName
    ? patientView.patientDetails.lastName
    : '-'

  const email = patientView?.patientDetails?.email
    ? patientView.patientDetails.email
    : '-'

  function handleCancle(event) {
    onClose(event)
    setCanclationDialog(true)
  }

  function handleClose(event) {
    onClose(event)
    setCanclationDialog(false)
    setOpenReschedule(false)
  }

  function handleReschedule(event) {
    onClose(event)
    setOpenReschedule(true)
  }

  function handleOnClose() {
    setOpenConfirmation(false)
  }

  function handleConfirmation() {
    setOpenConfirmation(true)
  }

  return (
    <Box>
      {patientView && (
        <Dialog open={open} className={classes.dialogBox}>
          <DialogTitle className={classes.dialogTitle}>
            <Box display="flex">
              <Typography variant="h5" className={classes.title}>
                Appointment
              </Typography>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box className={classes.slot}>
              <Typography variant="h5" className={classes.text}>
                {`Your slot time ${slotTime}`}
              </Typography>
            </Box>
            <Box display="flex" className={classes.details}>
              <Box>
                <Box display="flex">
                  <Typography variant="h5" className={classes.phoneNumber}>
                    Phone Number
                  </Typography>
                  <Typography className={classes.notchedOutline}>{phone}</Typography>
                </Box>
                <Box display="flex">
                  <Typography variant="h5" className={classes.firstName}>
                    First Name
                  </Typography>
                  <Typography className={classes.notchedOutline}>
                    {firstName}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Typography variant="h5" className={classes.lastName}>
                    Last Name
                  </Typography>
                  <Typography className={classes.notchedOutline}>
                    {lastName}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography variant="h5" className={classes.email}>
                    Email ID
                  </Typography>
                  <Typography className={classes.notchedOutline}>{email}</Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" paddingTop={1.5} paddingLeft={7}>
              {singleStar || doubleStar ? (
                <StarIcon className={classes.starIcon} color="primary" />
              ) : null}
              {doubleStar && (
                <StarIcon className={classes.starIcon} color="primary" />
              )}
              <Typography
                className={classNames(classes.note, {
                  [classes.patientNote]: bookedBy === 'Patient',
                })}
              >
                {note}
              </Typography>
            </Box>
          </DialogContent>
          <Box display="flex" className={classes.buttons}>
            <Box className={classes.close} onClick={handleClose}>
              <Typography variant="h5" className={classes.closeBtn}>
                CLOSE
              </Typography>
            </Box>
            <Box className={classes.cancle} onClick={handleCancle}>
              <Typography variant="h5" className={classes.cancleBtn}>
                CANCEL APPOINTMENT
              </Typography>
            </Box>
            <Box className={classes.reschedule} onClick={handleReschedule}>
              <Typography variant="h5" className={classes.rescheduleBtn}>
                RESCHEDULE APPOINTMENT
              </Typography>
            </Box>
          </Box>
        </Dialog>
      )}

      {openCanclationDialog && (
        <CancleAppointment
          open={openCanclationDialog}
          slotTime={slotTime}
          onClose={handleClose}
          id={appointmentId}
          onSave={onSave}
          doubleStar={doubleStar}
          cancellationNote={cancellationNote}
        />
      )}
      {openReschedule && (
        <RescheduleAppointment
          appointmentId={appointmentId}
          patientId={patientId}
          open={openReschedule}
          slotTime={slotTime}
          onClose={handleClose}
          details={patientView}
          onSave={onSave}
          bookedBy={bookedBy}
          note={note}
          phone={phone}
          firstName={firstName}
          lastName={lastName}
          email={email}
          setOpenConfirmation={handleConfirmation}
          setParameter={setParameter}
        />
      )}
      {openConfirmation && (
        <ConfirmationModal
          open={openConfirmation}
          slotTime={slotTime}
          onClose={handleOnClose}
          parameter={parameter}
          onSave={onSave}
        />
      )}
    </Box>
  )
}

export default CancleAndRescheduleModal
