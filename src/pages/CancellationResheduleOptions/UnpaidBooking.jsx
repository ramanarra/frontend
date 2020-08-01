import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Edit, Check, Clear } from '@material-ui/icons'

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
}))

const Cancellation = ({ configDetails, doctorKey, onSave, isAbleToWrite }) => {
  const classes = useStyles()
  const [autoCancelHours, setAutoCancelHours] = useState(0)
  const [autoCancelDays, setAutoCancelDays] = useState(0)
  const [autoCancelMins, setAutoCancelMins] = useState(0)
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (configDetails) {
      setAutoCancelDays(configDetails.autoCancelDays)
      setAutoCancelHours(configDetails.autoCancelHours)
      setAutoCancelMins(configDetails.autoCancelMins)
    }
  }, [configDetails])

  function handleOnCancel() {
    setAutoCancelDays(configDetails.autoCancelDays)
    setAutoCancelHours(configDetails.autoCancelHours)
    setAutoCancelMins(configDetails.autoCancelMins)
    setDisable(false)
  }

  function handleOnSave() {
    if (autoCancelDays && autoCancelHours && autoCancelMins) {
      const params = {
        doctorKey: doctorKey,
        autoCancelDays: Number(autoCancelDays),
        autoCancelHours: Number(autoCancelHours),
        autoCancelMins: Number(autoCancelMins),
      }
      onSave(params)
      setDisable(false)
    }
  }

  function handleOnAutoCancelnDays(event) {
    if (!isNaN(event.target.value)) {
      setAutoCancelDays(event.target.value)
    }
  }

  function handleOnAutoCancelHrs(event) {
    if (!isNaN(event.target.value) && event.target.value < 24) {
      setAutoCancelHours(event.target.value)
    }
  }

  function handleOnAutoCancelMins(event) {
    if (!isNaN(event.target.value) && event.target.value < 60) {
      setAutoCancelMins(event.target.value)
    }
  }

  return (
    <Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography className={classes.text}>
            Automatic Cancellation of appointments for unpaid booking
          </Typography>
          <NumberTextField
            label="Days"
            value={autoCancelDays}
            disabled={!disable}
            onChange={handleOnAutoCancelnDays}
          />
          <NumberTextField
            label="Hrs"
            value={autoCancelHours}
            onChange={handleOnAutoCancelHrs}
            disabled={!disable}
          />
          <NumberTextField
            label="Mins."
            value={autoCancelMins}
            disabled={!disable}
            onChange={handleOnAutoCancelMins}
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
                  <Clear className={classes.cancelation} onClick={handleOnCancel} />
                  <Check className={classes.iconButton} onClick={handleOnSave} />
                </div>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Cancellation
