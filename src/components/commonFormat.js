import React from 'react'
import moment from 'moment'
import NumberFormat from 'react-number-format'

export const customSuffix = (value, format) => {
  const pattern = ('' + value).replace(/[^\d]/g, '')
  if (pattern.length > 0) {
    return pattern.replace(/(\d{1,})/, '$1 ' + format)
  }
  return value
}

export const timeFmt = (time) => {
  return moment(time, 'hh:mmA').format('hh:mmA')
}

export const minsSuffix = (details) => {
  const { inputRef, onChange, ...other } = details

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: details.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator
      isNumericString
      suffix=" mins."
    />
  )
}
