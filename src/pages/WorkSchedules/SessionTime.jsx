import React, { useEffect, useState } from 'react'
import { Typography, TextField } from '@material-ui/core'
import OptionBox from './OptionBox'

const SessionTime = ({ data }) => {
  const [sessionTime, setSessionTime] = useState(null)

  useEffect(() => {
    setSessionTime(parseInt(data?.split(' ')[0]))
  }, [data])

  const isCustomTime = () => {
    const listSet = [15, 30, 45, 60]
    return listSet.includes(sessionTime)
  }

  const activeBox = (value) => {
    if (value !== -1) {
      return sessionTime === value ? ' active' : ''
    } else {
      return isCustomTime ? '' : ' active'
    }
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
          onClick={() => setSessionTime(15)}
        />
        <OptionBox
          className={'session-option' + activeBox(30)}
          value="30 minutes"
          onClick={() => setSessionTime(30)}
        />
        <OptionBox
          className={'session-option' + activeBox(45)}
          value="45 minutes"
          onClick={() => setSessionTime(45)}
        />
        <OptionBox
          className={'session-option' + activeBox(60)}
          value="60 minutes"
          onClick={() => setSessionTime(60)}
        />
        <div className={'session-option' + activeBox(-1)}>
          <TextField
            className="session-custom-option"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SessionTime
