import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit, Check, Clear, ErrorOutline } from '@material-ui/icons'

import Switch from '../../components/Switch'
import NumberTextField from '../../components/NumberTextField'

const useStyles = makeStyles(() => ({
  text: {
    color: '#101010',
    fontSize: 13.5,
    paddingRight: 16,
  },
  iconButton: {
    color: 'rgb(36, 189, 255)',
    fontSize: 15,
    marginRight: 11,
    marginBottom: 3,
  },

  cancelation: {
    marginRight: 11,
    color: 'rgb(36, 189, 255)',
    fontSize: 15,
  },

  paper: {
    width: 430,
    background: '#f7fdff',
    borderRadius: 0,
    boxShadow: 'none',
  },

  paperContainer: {
    display: 'flex',
    padding: '10px 22px',
  },

  errorIcon: {
    fontSize: 16,
    color: '#428398',
    marginTop: 4,
  },

  noteContent: {
    fontSize: 11,
    marginTop: 5,
    color: '#3A7D94',
  },
  noteContainer: {
    marginLeft: 5,
  },

  cancellationText: {
    fontSize: 11,
    color: '#216C86',
  },

  divider: {
    width: 1000,
    marginTop: 35,
    marginBottom: 35,
    background: '#f5f5f5',
  },
}))

const Cancellation = ({ configDetails, doctorKey, onSave, isAbleToWrite }) => {
  const classes = useStyles()
  const [isCancellationAllowed, setIsCancellationAllowed] = useState(false)
  const [cancellationHrs, setCancellationHrs] = useState(0)
  const [cancellationDays, setCancellationDays] = useState(0)
  const [cancellationMins, setCancellationMins] = useState(0)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (configDetails) {
      setIsCancellationAllowed(configDetails.isPatientCancellationAllowed)
      setCancellationDays(configDetails.cancellationDays)
      setCancellationHrs(configDetails.cancellationHours)
      setCancellationMins(configDetails.cancellationMins)
    }
  }, [configDetails])

  function handleOnCancellationChange(event) {
    setIsCancellationAllowed(event.target.checked)
    const params = {
      doctorKey: doctorKey,
      isPatientCancellationAllowed: event.target.checked,
    }
    onSave(params)
  }

  function handleOnCancel() {
    setCancellationDays(configDetails.cancellationDays)
    setCancellationHrs(configDetails.cancellationHours)
    setCancellationMins(configDetails.cancellationMins)
    setDisable(false)
  }

  function handleOnSave() {
    if (cancellationDays && cancellationHrs && cancellationMins) {
      const params = {
        doctorKey: doctorKey,
        cancellationDays: Number(cancellationDays),
        cancellationHours: Number(cancellationHrs),
        cancellationMins: Number(cancellationMins),
      }
      onSave(params)
      setDisable(false)
    }
  }

  function handleOnCancellationDays(event) {
    if (!isNaN(event.target.value)) {
      setCancellationDays(event.target.value)
    }
  }

  function handleOnCancellationHrs(event) {
    if (!isNaN(event.target.value) && event.target.value < 24) {
      setCancellationHrs(event.target.value)
    }
  }

  function handleOnCancellationMins(event) {
    if (!isNaN(event.target.value) && event.target.value < 60) {
      setCancellationMins(event.target.value)
    }
  }

  return (
    <Box>
      <Box display="flex" marginBottom={3} alignItems="center">
        <Typography className={classes.text}>
          Patient Cancellation Allowed
        </Typography>
        {isAbleToWrite && (
          <Switch
            checked={isCancellationAllowed}
            onChange={handleOnCancellationChange}
          />
        )}
      </Box>
      {isCancellationAllowed && (
        <Box>
          <Box display="flex" alignItems="center">
            <Typography className={classes.text}>
              How long before patient is allowed to cancel
            </Typography>
            <NumberTextField
              label="Days"
              value={cancellationDays}
              disabled={!disable}
              onChange={handleOnCancellationDays}
            />
            <NumberTextField
              label="Hrs"
              value={cancellationHrs}
              onChange={handleOnCancellationHrs}
              disabled={!disable}
            />
            <NumberTextField
              label="Mins."
              value={cancellationMins}
              disabled={!disable}
              onChange={handleOnCancellationMins}
            />
            {isAbleToWrite && (
              <Box paddingLeft={1} marginTop={1}>
                {!disable ? (
                  <Edit
                    className={classes.iconButton}
                    onClick={() => setDisable(true)}
                  />
                ) : (
                  <div>
                    <Clear
                      className={classes.cancelation}
                      onClick={handleOnCancel}
                    />
                    <Check className={classes.iconButton} onClick={handleOnSave} />
                  </div>
                )}
              </Box>
            )}
          </Box>
          <Box marginTop={2.5}>
            <Paper className={classes.paper}>
              <Box className={classes.paperContainer}>
                <ErrorOutline className={classes.errorIcon} />
                <div className={classes.noteContainer}>
                  <p className={classes.noteContent}>
                    <b className={classes.cancellationText}>Note</b> : Cancellation
                    with in the allowed timings, the payment willbe refund to the
                    original payment method. if paid through VIRUJH{' '}
                  </p>
                </div>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}

      <Divider className={classes.divider} />
    </Box>
  )
}

export default Cancellation
