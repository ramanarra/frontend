import React, { useEffect, useState } from 'react'
import { Typography, TextField } from '@material-ui/core'

import OptionBox from './OptionBox'
import { minsSuffix } from '../../components/commonFormat.js'
import ConfimationDialog from './ConfirmationDialog'

const SessionTime = ({ data, handleUpdate, response }) => {
  const [sessionTime, setSessionTime] = useState(null)
  const [customTime, setCustomTime] = useState('')
  const [isChanged, setChanged] = useState(false)

  const [openDialog, setOpenDialog] = useState(false)

  const [value, setValue] = useState(null)

  const [isEdit, setEdit] = useState(false)

  useEffect(() => {
    if (!!data) {
      const defaultTimes = [15, 30, 45, 60]
      defaultTimes.includes(data) ? setSessionTime(data) : setCustomTime(data)
      defaultTimes.includes(data) ? setCustomTime('') : setCustomTime(data) 
    }
  }, [data, response])


  const handleSave = (saveValue) => {
    const time = saveValue || sessionTime || customTime || 0
    isChanged && setChanged(false)
    handleUpdate({
      workScheduleConfig: {
        consultationSessionTimings: time,
      },
    })
  }

  const handleChange = (value, type) => {
    if (Number(value) > 0 && Number(value) <= 60) {
      if (!!type) {
        !!sessionTime && value !== '' && setSessionTime(null)
        setCustomTime(value)
        !isChanged && setChanged(true)
      } else {
        if (!!value && value !== sessionTime) {
          !!customTime && setCustomTime('')
          setSessionTime(value)
          handleSave(value)
        }
      }
    }
  }

  const activeBox = (value) => {
    return !!sessionTime && sessionTime === value ? ' active' : ''
  }

  const handleKey = (e) => {
    setEdit(true)
    if (e.keyCode === 13) {
      isChanged && setOpenDialog(true)
    }
  }

  

  const handleOnClick = (value) => {
    setEdit(false)
    setValue(value)
    setOpenDialog(true)
  }

  const handleOnClose = (event) => {
    setOpenDialog(false)

    setEdit(false)

    event.preventDefault()
  }

  return (
    <div className="session-time-det-wrap">
      <Typography variant="subtitle2" className="sub-head">
        Consultation Session Timing
      </Typography>
      <div className="session-options-wrap">
        <OptionBox
          className={'session-option' + activeBox(15)}
          value="15 minutes"
          onClick={() => handleOnClick(15)}
        />
        <OptionBox
          className={'session-option' + activeBox(30)}
          value="30 minutes"
          onClick={() => handleOnClick(30)}
        />
        <OptionBox
          className={'session-option' + activeBox(45)}
          value="45 minutes"
          onClick={() => handleOnClick(45)}
        />
        <OptionBox
          className={'session-option' + activeBox(60)}
          value="60 minutes"
          onClick={() => handleOnClick(60)}
        />
        <div className="session-option">
          <TextField
            className={'session-custom-option' + (!!customTime ? ' active' : '')}
            value={customTime}
            onChange={(e) => handleChange(e.target.value, 1)}
            onKeyDown={handleKey}
            placeholder="20mins."
            InputProps={{
              inputComponent: minsSuffix,
            }}
          />
        </div>
      </div>
     
      {openDialog && (
        <ConfimationDialog
          open={openDialog}
          onClose={handleOnClose}
          handleChange={handleChange}
          value={value}
          handleSave={handleSave}
          isEdit={isEdit}
        />
      )}
    </div>
  )
}

export default SessionTime
