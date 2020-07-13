import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, TextField } from '@material-ui/core'
import { Edit, Check, Clear } from '@material-ui/icons'

import Switch from '../../components/Switch'

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 25,
  },
  text: {
    color: '#4e4e4e',
    fontSize: 13.3,
  },
  time: {
    '& input': {
      backgroundColor: '#f7f7f7',
      padding: '7px 4px',
      width: 20,
      textAlign: 'center',
    },
    '& fieldset': {
      border: 'none',
    },
    paddingLeft: 13,
    paddingRight: 7,
    '& div': {
      height: 15,
    },
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

  star: {
    color: 'red',
    fontSize: 11,
  },
  txt: {
    fontSize: 12,
    color: '#4e4e4e',
    paddingLeft: 3,
  },
}))

function Preconsultancy({ docKey, onSave, configDetails }) {
  const [preconsultationAllowed, setPreconsultationAllowed] = useState(false)
  const [preconsultationHrs, setPreconsultationHrs] = useState(0)
  const [preconsultationMins, setPreconsultationMins] = useState(0)
  const [disable, setDisable] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (configDetails) {
      setPreconsultationAllowed(configDetails.isPreconsultationAllowed)
      setPreconsultationMins(configDetails.preconsultationMins)
      setPreconsultationHrs(configDetails.preconsultationHours)
    }
  }, [configDetails])

  function handleOnPreconsultationChange(event) {
    setPreconsultationAllowed(event.target.checked)
    const params = {
      doctorKey: docKey,
      isPreconsultationAllowed: event.target.checked,
    }
    onSave(params)
  }

  function handleOnPreconsultationHrsChange(event) {
    if (!isNaN(event.target.value)) {
      setPreconsultationHrs(event.target.value)
    }
  }

  function handleOnPreconsultationMinsChange(event) {
    if (!isNaN(event.target.value)) {
      setPreconsultationMins(event.target.value)
    }
  }

  function handleOnCancel() {
    setPreconsultationHrs(configDetails.preconsultationHours)
    setPreconsultationMins(configDetails.preconsultationMins)
    setDisable(false)
  }

  function handleOnSave() {
    if (preconsultationHrs && preconsultationMins) {
      const params = {
        doctorKey: docKey,
        preconsultationHours: preconsultationHrs,
        preconsultationMins: preconsultationMins,
      }

      onSave(params)
      setDisable(false)
    }
  }

  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Typography className={classes.text}>Pre-consultancy</Typography>
        <Box paddingLeft={3}>
          <Switch
            checked={preconsultationAllowed}
            onChange={handleOnPreconsultationChange}
          />
        </Box>
      </Box>

      {preconsultationAllowed && (
        <Box>
        <Box display="flex" paddingTop={3}>
          <Typography className={classes.text}>
            Patient Pre-Consultancy Time:
          </Typography>
          <TextField
            className={classes.time}
            variant="outlined"
            value={preconsultationHrs}
            size="small"
            inputProps={{ maxLength: 2 }}
            onChange={handleOnPreconsultationHrsChange}
            disabled={!disable}
          />
          <Typography className={classes.text}>Hrs</Typography>
          <TextField
            className={classes.time}
            variant="outlined"
            value={preconsultationMins}
            size="small"
            inputProps={{ maxLength: 2 }}
            onChange={handleOnPreconsultationMinsChange}
            disabled={!disable}
          />
          <Typography className={classes.text}>Mins.</Typography>
          <Box paddingLeft={1}>
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
          </Box>
          <Box style={{ paddingTop: 20 }} className={classes.message} display="flex">
            <Typography className={classes.star}>*</Typography>
            <Typography
              className={classes.txt}
            >
              Patient has to make himself to available even before the slot time
              based on time provided
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default Preconsultancy
