import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import Switch from '../../components/Switch'
import OptionBox from './OptionBox'
import EditField from './EditField'

const OverBooking = ({ data, handleUpdate }) => {
  const [bookingData, setBookingData] = useState({
    overBookingEnabled: false,
    overBookingCount: 0,
    overBookingType: null,
  })

  useEffect(() => {
    delete data?.consultationSessionTimings
    setBookingData(data)
  }, [data])

  useEffect(() => {
    delete data?.consultationSessionTimings
    JSON.stringify(data) !== JSON.stringify(bookingData) &&
      handleUpdate({
        workScheduleConfig: {
          ...bookingData,
        },
      })
  }, [bookingData])

  const isActive = (value) => {
    if (value.toLowerCase() === bookingData?.overBookingType?.toLowerCase()) {
      return true
    } else {
      return false
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBookingData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <div className="overbooking-det-wrap">
      <div className="overbooking-status">
        <Typography variant="subtitle2" className="sub-head">
          Add overbookings
        </Typography>
        <Switch
          checked={bookingData?.overBookingEnabled}
          onClick={() =>
            setBookingData((prev) => {
              return {
                ...prev,
                overBookingEnabled: !prev?.overBookingEnabled,
              }
            })
          }
        />
      </div>
      {bookingData?.overBookingEnabled && (
        <div className="overbooking-option">
          <div className="sec1">
            Total overbookings are allowed{' '}
            <span className="overbooking-value">
              <EditField
                value={bookingData?.overBookingCount}
                name="overBookingCount"
                onSave={handleChange}
              />
            </span>
          </div>
          <div className="charge-type">
            <OptionBox
              className={isActive('Per hour') ? ' active' : ''}
              name="overBookingType"
              value="Per hour"
              onClick={handleChange}
            />
            <OptionBox
              className={isActive('Per day') ? ' active' : ''}
              name="overBookingType"
              value="Per day"
              onClick={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default OverBooking
