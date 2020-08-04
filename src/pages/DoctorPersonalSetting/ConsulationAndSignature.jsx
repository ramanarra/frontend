import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, InputAdornment } from '@material-ui/core'
import { Edit, Check, Clear } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

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
    paddingTop: 20,
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

  icon: {
    paddingLeft: 8,
    paddingTop: 6,
    fontSize: 25,
  },

  iconStart: {
    color: '#777777',
    fontSize: 13,
  },

  iconbutton: {
    color: 'rgb(36, 189, 255)',
    fontSize: 15,
    marginRight: 11,
  },

  cancelation: {
    marginRight: 11,
    color: 'rgb(36, 189, 255)',
    fontSize: 15,
  },

  icon: {
    paddingLeft: 8, 
    paddingTop: 4
  }
}))

function ConsulationAndSignature({ docKey, configDetails, onSave, isAbleToWrite }) {
  const [fees, setFees] = useState(0)
  const [disable, setDisable] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setFees(configDetails?.consultationCost)
  }, [configDetails])

  const setfee = (event) => {
    if (!isNaN(event.target.value)) {
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
    if(fees) {
      const params = {
        doctorKey: docKey,
        consultationCost: fees
      }

      onSave(params)
      setDisable(false)
    }

  }

  return (
    <Box>
      <Typography className={classes.text}>Consultation Base Fees</Typography>
      <Box display='flex'>
        <TextField
          className={classes.notchedOutline}
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
      {isAbleToWrite && <div className={classes.icon}>
          {!disable ? (
            <Edit
              className={classes.iconbutton}
              onClick={() => handleOndisabled()}
            />
          ) : (
            <div>
              <Clear className={classes.cancelation} onClick={handleOnCancel} />
              <Check className={classes.iconbutton} onClick={hanleOnSave}/>
            </div>
          )}
        </div> }
      </Box>
      <div className={classes.signature}>
         {/* <img src={doctorDetails?.signature} alt="signature"/> */}
      </div>
    </Box>
  )
}

export default ConsulationAndSignature
