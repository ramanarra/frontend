import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { Edit, Check, Clear } from '@material-ui/icons'

import Switch from '../../components/Switch'
import NumberTextField from '../../components/NumberTextField'

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 25,
  },
  text: {
    color: '#4e4e4e',
    fontSize: 13.3,
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

function Preconsultancy({ docKey, onSave, configDetails, isAbleToWrite }) {
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
    if (!isNaN(event.target.value) && event.target.value < 24) {
      setPreconsultationHrs(event.target.value)
    }
  }

  function handleOnPreconsultationMinsChange(event) {
    if (!isNaN(event.target.value) && event.target.value < 60) {
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
        preconsultationHours: Number(preconsultationHrs),
        preconsultationMins: Number(preconsultationMins),
      }

      onSave(params)
      setDisable(false)
    }
  }

  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Typography className={classes.text}>Pre-consultancy</Typography>
        {isAbleToWrite && (
          <Box paddingLeft={3}>
            <Switch
              checked={preconsultationAllowed}
              onChange={handleOnPreconsultationChange}
            />
          </Box>
        )}
      </Box>

      {preconsultationAllowed && (
        <Box>
          <Box display="flex" paddingTop={3} alignItems="center">
            <Typography className={classes.text}>
              Patient Pre-Consultancy Time:
            </Typography>
            <NumberTextField
              value={preconsultationHrs}
              onChange={handleOnPreconsultationHrsChange}
              disabled={!disable}
              label="Hrs"
            />
            <NumberTextField
              value={preconsultationMins}
              onChange={handleOnPreconsultationMinsChange}
              disabled={!disable}
              label="Mins."
            />
            {isAbleToWrite && (
              <Box paddingLeft={1} display="flex" alignItems="center">
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
          <Box style={{ paddingTop: 20 }} className={classes.message} display="flex">
            <Typography className={classes.star}>*</Typography>
            <Typography className={classes.txt}>
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
