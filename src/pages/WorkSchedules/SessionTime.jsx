import React from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import OptionBox from './OptionBox'

const SessionTime = () => {
  return (
    <div className="session-time-det-wrap">
      <Typography variant="subtitle2" className="sub-head">
        Consultation Session Timing
      </Typography>
      <div className="session-options-wrap">
        <OptionBox
          className="session-option"
          value="15 minutes"
          onClick={() => console.log(15)}
        />
        <OptionBox
          className="session-option"
          value="30 minutes"
          onClick={() => console.log(30)}
        />
        <OptionBox
          className="session-option"
          value="45 minutes"
          onClick={() => console.log(45)}
        />
        <OptionBox
          className="session-option"
          value="60 minutes"
          onClick={() => console.log(60)}
        />
        <div className="session-option">
          <TextField className="session-custom-option" />
        </div>
      </div>
    </div>
  )
}

export default SessionTime
