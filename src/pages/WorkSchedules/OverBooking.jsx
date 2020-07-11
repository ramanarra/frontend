import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import Switch from '../../components/Switch'
import OptionBox from './OptionBox'
import EditField from './EditField'

const OverBooking = (props) => {
  return (
    <div className="overbooking-det-wrap">
      <div className="overbooking-status">
        <Typography variant="subtitle2" className="sub-head">
          Add overbooking
        </Typography>
        <Switch />
      </div>
      <div className="overbooking-option">
        <div className="sec1">
          Total overbookings allowed{' '}
          <span className="overbooking-value">
            <EditField />
          </span>
        </div>
        <div className="charge-type">
          <OptionBox value="Per hour" />
          <OptionBox value="Per day" />
        </div>
      </div>
    </div>
  )
}

export default OverBooking
