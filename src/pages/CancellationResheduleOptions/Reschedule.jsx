import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit, Check, Clear } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'


import Switch from '../../components/Switch'
import NumberTextField from '../../components/NumberTextField'
import UnpaidBooking from './UnpaidBooking'
import SnackBar from '../../components/SnackBar'


const useStyles = makeStyles(() => ({
  text: {
    color: '#101010',
    fontSize: 13.5,
    paddingRight: 16,
  },
  iconButton: {
    color: 'rgb(36, 189, 255)',
    marginRight: 8,
    marginBottom: 3,
  },

  editIcon: {
    fontSize: 19,
  },

  cancelation: {
    color: 'rgb(36, 189, 255)',
    fontSize: 19,
  },

  checkIcon: {
    fontSize: 19,
  },

  message: {
    color: '#ec1144',
    fontSize: 14,
  }
}))

const Cancellation = ({ configDetails, doctorKey, onSave, isAbleToWrite, response }) => {
  const classes = useStyles()
  const [isPatientRescheduleAllowed, setIsPatientRescheduleAllowed] = useState(false)
  const [rescheduleDays, setRescheduleDays] = useState(0)
  const [rescheduleHours, setRescheduleHours] = useState(0)
  const [rescheduleMins, setRescheduleMins] = useState(0)
  const [disable, setDisable] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (configDetails) {
      setIsPatientRescheduleAllowed(configDetails.isPatientRescheduleAllowed)
      setRescheduleDays(configDetails.rescheduleDays)
      setRescheduleHours(configDetails.rescheduleHours)
      setRescheduleMins(configDetails.rescheduleMins)
    }
  }, [configDetails])

  function handleOnRescheduleChange(event) {
    setIsPatientRescheduleAllowed(event.target.checked)
    const params = {
      doctorKey: doctorKey,
      isPatientRescheduleAllowed: event.target.checked,
    }
    onSave(params)
  }

  function handleOnCancel() {
    setRescheduleDays(configDetails.rescheduleDays)
    setRescheduleHours(configDetails.rescheduleHours)
    setRescheduleMins(configDetails.rescheduleMins)
    setDisable(false)
  }

  function handleOnSave() {
    if (rescheduleDays && rescheduleHours && rescheduleMins) {
      const params = {
        doctorKey: doctorKey,
        rescheduleDays: Number(rescheduleDays),
        rescheduleHours: Number(rescheduleHours),
        rescheduleMins: Number(rescheduleMins),
      }
      onSave(params)
      setDisable(false)
      setOpen(true)
    }
  }

  function handleOnRescheduleDays(event) {
    if (!isNaN(event.target.value)) {
      setRescheduleDays(event.target.value)
    }
  }

  function handleOnRescheduleHrs(event) {
    if (!isNaN(event.target.value) && event.target.value < 24) {
      setRescheduleHours(event.target.value)
    }
  }

  function handleOnReschedulenMins(event) {
    if (!isNaN(event.target.value) && event.target.value < 60) {
      setRescheduleMins(event.target.value)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Box>
      <Box display="flex" marginBottom={4} alignItems="center">
        <Typography className={classes.text}>Patient Reschedule</Typography>
        {isAbleToWrite && (
          <Switch
            checked={isPatientRescheduleAllowed}
            onChange={handleOnRescheduleChange}
          />
        )}
      </Box>
      {isPatientRescheduleAllowed && (
        <Box>
          <Box display="flex" alignItems="center">
            <Typography className={classes.text}>
              How long before patient is allowed to re-schedule
            </Typography>
            <NumberTextField
              label="Days"
              value={rescheduleDays}
              disabled={!disable}
              onChange={handleOnRescheduleDays}
            />
            <NumberTextField
              label="Hrs"
              value={rescheduleHours}
              onChange={handleOnRescheduleHrs}
              disabled={!disable}
            />
            <NumberTextField
              label="Mins."
              value={rescheduleMins}
              disabled={!disable}
              onChange={handleOnReschedulenMins}
            />
            {isAbleToWrite && (
              <Box paddingLeft={1} marginTop={0}>
                {!disable ? (
                  <IconButton
                    className={classes.iconButton}
                    onClick={() => setDisable(true)}
                  >
                    <Edit className={classes.editIcon} />
                  </IconButton>
                ) : (
                  <div>
                    <IconButton
                      className={classes.iconButton}
                      onClick={handleOnCancel}
                    >
                      <Clear className={classes.cancelation} />
                    </IconButton>
                    <IconButton
                      className={classes.iconButton}
                      onClick={handleOnSave}
                    >
                      <Check className={classes.checkIcon} />
                    </IconButton>
                  </div>
                )}
              </Box>
            )}
          </Box>
          {
            response && response.statusCode !== 200 && 
            <Typography className={classes.message}>{response.data.message.message}</Typography>
          }
          <Box marginTop={4}>
            <UnpaidBooking
              configDetails={configDetails}
              doctorKey={doctorKey}
              onSave={onSave}
              isAbleToWrite={isAbleToWrite}
              response={response}
            />
          </Box>
        </Box>
      )}

      {response && response.statusCode === 200 && (
        <SnackBar open={open} message={response.message} onclose={handleClose} />
      )}
    </Box>
  )
}

export default Cancellation
