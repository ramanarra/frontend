import React, { useEffect, useState } from 'react'
import Textfield from '../Textfield'
import { Button, Popover } from '@material-ui/core'
import { DateRange } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { dateFmt } from '../commonFormat'

import './style.scss'

const DateRangePicker = ({
  btnText,
  setChange,
  value,
  label,
  matLabel,
  emptyText,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [view, setView] = useState('')
  const initDate = [
    {
      startDate: value?.startDate || new Date(),
      endDate: value?.endDate || new Date(),
      key: 'selection',
    },
  ]
  const [date, setDate] = useState(initDate)

  const handleClose = () => {
    setAnchorEl(null)
    setDate(initDate)
  }

  const handleClick = () => {
    setChange &&
      setChange({
        startDate: date[0].startDate,
        endDate: date[0].endDate,
      })
    handleClose()
  }

  useEffect(() => {
    const viewText = !!value?.startDate
      ? `${dateFmt(value.startDate)}  -  ${dateFmt(value.endDate)}`
      : emptyText ?? ''
    setView(viewText)
    if (!!value?.startDate) {
      setDate([
        {
          startDate: value?.startDate,
          endDate: value?.endDate,
          key: 'selection',
        },
      ])
    }
  }, [value])

  return (
    <div className="date-range-picker">
      <Textfield
        className="date-range-picker-txt-field"
        value={view}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        label={label}
        matLabel={matLabel}
        readOnly
      />
      <Popover
        className="date-range-picker-popup"
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="date-picker-wrap">
          <DateRange
            color="#0bb5ff"
            rangeColors={["#0bb5ff"]}
            scroll={{
              enabled: true,
            }}
            onChange={(item) => {
              console.log(item)
              setDate([item.selection])
            }}
            ranges={date}
            {...rest}
          />
          <div className="okay-btn-wrap">
            <Button className="okay-btn" color="primary" onClick={handleClick}>
              {btnText || 'Select'}
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default DateRangePicker
