import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Box, Typography, TextField, InputAdornment } from '@material-ui/core'
import { Edit, Check, Clear } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import SnackBar from '../../components/SnackBar'

const useStyles = makeStyles(() => ({
  notchedOutline: {
    '& input': {
      backgroundColor: '#f7f7f7',
      color: '#777777',
      height: 10,
    },
    '& div': {
      backgroundColor: '#f7f7f7',
    },
    '& fieldset': {
      paddingLeft: 8,
      height: 28,
      color: '#777777',
      border: 'none',
    },
    width: 310,
    color: '#777777',
    paddingBottom: 20,
  },
  text: {
    fontSize: 13.5,
    paddingBottom: 6,
    color: '#4e4e4e',
  },

  signature: {
    backgroundColor: '#f7f7f7',
    width: 620,
    height: 90,
    overflow: 'hidden',
    position: 'relative',

    '& before': {
      content: '',
      position: 'absolute',
      border: '5px dashed #FF0000',
      top: -3,
      bottom: -3,
      left: -3,
      right: -3,
    },
  },

  sign: {
    marginLeft: 200,
    height: 90,
    fill: '#f7f7f7',
  },

  iconStart: {
    color: '#777777',
    fontSize: 13,
  },

  iconbutton: {
    color: 'rgb(36, 189, 255)',
    marginTop: -9,
    padding: 5,
  },

  editIcon: {
    fontSize: 20,
  },

  cancelation: {
    color: 'rgb(36, 189, 255)',
    fontSize: 20,
  },

  checkIcon: {
    fontSize: 20,
  },

  icon: {
    paddingLeft: 8,
    paddingTop: 4,
  },

  editable: {
    paddingBottom: 0,
    marginBottom: 20,
    border: '1px solid',
  },

  response: {
    fontSize: 14,
    color: 'red',
  },
}))

function ConsulationAndSignature({
  docKey,
  configDetails,
  doctorDetails,
  onSave,
  isAbleToWrite,
  response,
}) {
  const [fees, setFees] = useState(0)
  const [disable, setDisable] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setFees(configDetails?.consultationCost)
  }, [configDetails])

  const setfee = (event) => {
    if (!isNaN(event.target.value) && event.target.value < 10000) {
      setFees(event.target.value)
    }
  }
  function handleOndisabled() {
    setDisable(true)
  }

  function handleOnCancel() {
    setFees(configDetails?.consultationCost)
    setDisable(false)
  }

  function hanleOnSave() {
    if (fees) {
      const params = {
        doctorKey: docKey,
        consultationCost: Number(fees),
      }

      onSave(params)
      setDisable(false)
      setOpen(true)
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
      <Typography className={classes.text}>Consultation Base Fees</Typography>
      <Box display="flex">
        <TextField
          className={classNames(classes.notchedOutline, {
            [classes.editable]: disable === true,
          })}
          variant="outlined"
          value={fees}
          disabled={!disable}
          onChange={setfee}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span className={classes.iconStart}>INR</span>
              </InputAdornment>
            ),
          }}
        />
        {isAbleToWrite && (
          <div className={classes.icon}>
            {!disable ? (
              <IconButton
                className={classes.iconbutton}
                onClick={() => handleOndisabled()}
              >
                <Edit className={classes.editIcon} />
              </IconButton>
            ) : (
              <div>
                <IconButton className={classes.iconbutton} onClick={handleOnCancel}>
                  <Clear className={classes.cancelation} />
                </IconButton>
                <IconButton className={classes.iconbutton} onClick={hanleOnSave}>
                  <Check className={classes.checkIcon} />
                </IconButton>
              </div>
            )}
          </div>
        )}
      </Box>
      <div className={classes.signature}>
        <img
          src={doctorDetails?.signature}
          alt="signature"
          className={classes.sign}
        />
      </div>
      {(response && response.statusCode && response.statusCode === 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'success'}
        />
      )) ||
      (response && response.statusCode && response.statusCode !== 200 && (
        <SnackBar
          openDialog={open}
          message={response.message}
          onclose={handleClose}
          severity={'error'}
        />
      ))}
      {(response && response.name === 'Error' && response.status === 500 && (
        <SnackBar
          openDialog={open}
          message={'Internal server error'}
          onclose={handleClose}
          severity={'error'}
        />
      )) ||
        (response && response.name === 'Error' && response.status !== 500 && (
          <SnackBar
            openDialog={open}
            message={'Something went wrong'}
            onclose={handleClose}
            severity={'error'}
          />
        ))}
    </Box>
  )
}

export default ConsulationAndSignature
